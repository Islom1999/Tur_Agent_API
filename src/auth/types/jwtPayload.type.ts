import { Permission } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: string;
  permissions?: Permission[];
};
