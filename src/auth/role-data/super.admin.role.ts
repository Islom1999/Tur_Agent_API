import { Permission } from '@prisma/client';
import { RoleType } from 'src/enumerations';

export const roleSuperAdmin: { title: string; permissions: Permission[] } = {
  title: RoleType.SUPER_ADMIN,
  permissions: [
    'special_create',
    'special_view',
    'special_update',
    'special_delete',

    'product_create',
    'product_view',
    'product_update',
    'product_delete',

    'order_create',
    'order_view',
    'order_update',
    'order_delete',

    'user_create',
    'user_view',
    'user_update',
    'user_delete',

    'role_create',
    'role_view',
    'role_update',
    'role_delete',
  ],
};
