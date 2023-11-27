import { Permission } from '@prisma/client';
import { RoleType } from 'src/enumerations';

export const baseUser: { title: string; permissions: Permission[] } = {
  title: RoleType.BASE_USER,
  permissions: ['special_view', 'product_view', 'order_view'],
};
