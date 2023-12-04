import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateClientDto,
  UpdateClientPasswordDto,
  VerifyEmailDto,
  loginClientDto,
} from '../dto';
import { RtGuard } from 'src/common/guards';
import { Tokens } from '../types';

@Controller('auth/client')
export class ClientController {
  constructor(private authService: ClientService) {}
  // Clinet Google Authentication
  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('/google')
  @HttpCode(HttpStatus.OK)
  googleAuth(@Req() req): any {
    req;
    return { message: 'Google authentication' };
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  @HttpCode(HttpStatus.OK)
  googleAuthRedirect(@Req() req): any {
    return this.authService.googleAuthRedirect(req.user);
  }

  // Client Facebook Authentication
  @Public()
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth(): any {
    return { message: 'Facebook authentication' };
  }

  @Public()
  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req): Promise<any> {
    return this.authService.facebookAuthRedirect(req.user);
  }

  // client register with email pocha
  @Public()
  @Post('/register')
  async registerClient(@Body() client: CreateClientDto): Promise<any> {
    return this.authService.registerClient(client);
  }

  @Public()
  @Post('/login')
  async loginClient(@Body() client: loginClientDto): Promise<any> {
    return this.authService.loginClient(client);
  }

  @Public()
  @Post('/register/verify')
  async verifyEmailClient(@Body() verifyDto: VerifyEmailDto): Promise<any> {
    return this.authService.verifyEmailClient(verifyDto);
  }

  // reset password
  @Post('/update-password')
  async updateClientPassword(
    @Body() dto: UpdateClientPasswordDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.authService.updateClientPassword(userId, dto);
  }

  @Public()
  @Post('/reset-password')
  async requestPasswordReset(@Body() body: { email: string }) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Public()
  @Post('/reset-password/new-password')
  async resetPassword(
    @Body() body: { email: string; code: string; password: string },
  ) {
    return this.authService.resetPassword(body.email, body.code, body.password);
  }

  // logout and refresh token
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logoutClient(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logoutClient(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokensClient(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokensClient(userId, refreshToken);
  }
}
