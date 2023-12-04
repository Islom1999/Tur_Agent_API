import {
  ForbiddenException,
  HttpCode,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IFacebookClient, IGoogleClient, MailService } from 'src/base';
import { PrismaService } from 'src/prisma';
import {
  CreateClientDto,
  UpdateClientPasswordDto,
  VerifyEmailDto,
  loginClientDto,
} from '../dto';
import * as argon from 'argon2';
import { JwtPayload, Tokens } from '../types';
import { RoleTypeClient } from 'src/enumerations';

@Injectable()
export class ClientService {
  url = '';
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private mailService: MailService,
  ) {
    this.url = config.get<string>('APP_URL');
  }

  // Client Google Authentication
  async googleAuthRedirect(user: IGoogleClient) {
    let client = await this.prisma.client.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!client) {
      client = await this.prisma.client.create({
        data: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    }

    const tokens = await this.getTokens(client.id, client.email);

    await this.updateClientRtHash(client.id, tokens.refresh_token);

    return tokens;
  }

  // Client Facebook Authentication
  async facebookAuthRedirect(user: IFacebookClient) {
    let client = await this.prisma.client.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!client) {
      client = await this.prisma.client.create({
        data: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    }

    const tokens = await this.getTokens(client.id, client.email);
    await this.updateClientRtHash(client.id, tokens.refresh_token);

    return tokens;
  }

  // Client register with email pochta

  async loginClient(client: loginClientDto) {
    const user = await this.prisma.client.findUnique({
      where: {
        email: client.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.hash, client.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHashClient(user.id, tokens.refresh_token);

    return tokens;
  }

  async registerClient(client: CreateClientDto) {
    const hashedPassword = await argon.hash(client.password);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); // 6 raqamli kod

    const verificationCodeExpires = new Date();
    verificationCodeExpires.setHours(verificationCodeExpires.getHours() + 1);

    const user = await this.prisma.client.create({
      data: {
        email: client.email,
        firstname: client.firstname,
        lastname: client.lastname,
        hash: hashedPassword,
        verificationCode,
        verificationCodeExpires,
      },
    });

    await this.mailService.sendVerificationEmail(
      user.email,
      user.verificationCode,
    );

    return {
      email: user.email,
      message: 'Verification code sended successfully',
    };
  }

  async verifyEmailClient(veryfyDto: VerifyEmailDto) {
    const { email, code } = veryfyDto;

    const user = await this.prisma.client.findUnique({
      where: { email },
    });

    if (!user || user.verificationCode !== code) {
      throw new ForbiddenException('Access Denied');
    }

    const now = new Date();
    if (now > user.verificationCodeExpires) {
      throw new ForbiddenException('Access Denied');
    }

    await this.prisma.client.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationCode: null,
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHashClient(user.id, tokens.refresh_token);

    return tokens;
  }

  // cleint reset password

  async updateClientPassword(
    id: string,
    dto: UpdateClientPasswordDto,
  ): Promise<any> {
    const { password, newPassword } = dto;
    const hash = await argon.hash(newPassword);

    const user = await this.prisma.client.findUnique({ where: { id } });

    const passwordMatches = await argon.verify(user.hash, password);
    if (!passwordMatches)
      throw new ForbiddenException('Access denied password invalid');

    // if(!password && !newPassword && !passwordMatches){
    //   throw new ForbiddenException('Access Denied password invalid');
    // }

    await this.prisma.client.update({ where: { id }, data: { hash } });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHashClient(user.id, tokens.refresh_token);

    return tokens;
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.client.findUnique({ where: { email } });
    if (!user) {
      throw new ForbiddenException('Access Denied, user not found');
    }

    const passwordResetCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const passwordResetExpires = new Date();
    passwordResetExpires.setHours(passwordResetExpires.getHours() + 1); // 1 soatlik muddat

    await this.prisma.client.update({
      where: { id: user.id },
      data: { passwordResetCode, passwordResetExpires },
    });

    await this.mailService.sendPasswordResetEmail(email, passwordResetCode);

    return { email, message: 'Reset password send code email successfully' };
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.prisma.client.findUnique({ where: { email } });
    const now = new Date();

    if (
      !user ||
      user.passwordResetCode !== code ||
      now > user.passwordResetExpires
    ) {
      throw new ForbiddenException('Access Denied');
    }

    const hash = await argon.hash(newPassword);

    await this.prisma.client.update({
      where: { id: user.id },
      data: { hash, passwordResetCode: null, passwordResetExpires: null },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHashClient(user.id, tokens.refresh_token);

    return { message: 'password updated', ...tokens };
  }

  // logout and refresh tokens
  async logoutClient(userId: string): Promise<boolean> {
    await this.prisma.client.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokensClient(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.client.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHashClient(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHashClient(
    userId: string,
    rt: string | undefined,
  ): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.client.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  // Functions for service

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: this.config.get<string>('AT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: this.config.get<string>('RT_EXPIRES_IN'),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateClientRtHash(
    userId: string,
    rt: string | undefined,
  ): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.client.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

}
