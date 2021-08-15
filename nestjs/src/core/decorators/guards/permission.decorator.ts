import { SetMetadata } from '@nestjs/common';
import { METADATA } from 'src/common/constants/api-metadata.const';
import { Permission } from '../../../common/enums/permission.enum';

export const Permissions = (...permissions: Permission[]) => {
    return SetMetadata(METADATA.PERMISSION, permissions);
};
