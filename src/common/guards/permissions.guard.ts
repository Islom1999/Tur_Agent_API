import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private _prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions =
      this.reflector.getAllAndOverride<string[]>('permissions', [
        context.getHandler(),
        context.getClass(),
      ]) || [];
    const userToken = context.switchToHttp().getRequest().user;
    const user = await this._prisma.user.findUnique({
      where: { id: userToken.sub },
      include: {
        role: true,
      },
    });

    if (user?.isBlock) {
      throw new HttpException(
        'You blocked, you do not have a role',
        HttpStatus.FORBIDDEN,
      );
    }

    if (!this.validateRoles(permissions, user?.role?.permissions)) {
      throw new HttpException('You do not have a role.', HttpStatus.FORBIDDEN);
    }

    return true;
  }

  private validateRoles(
    allowedRoles: string[],
    userRoles: string[] = [],
  ): boolean {
    return allowedRoles.some((role) => userRoles.includes(role));
  }
}
