import { AdminUserModule } from 'src/modules/admin/admin-user/admin-user.module';
import { UserModule } from '../../modules/default/user/user.module';

export const adminModules = [AdminUserModule];

export const defaultModules = [UserModule];
