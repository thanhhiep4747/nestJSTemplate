import { Permission } from 'src/common/enums/permission.enum';

export class User {
    userId: number;
    email: string;
    password: string;
    fullName: string;
    permissions: Permission[];
}
