import { Injectable } from '@nestjs/common';
import { User } from 'src/common/models/entities/user.entity';
import { CommonUserRepository } from '../../repositories/users/common-user-reposity';

@Injectable()
export class CommonUsersService {
    private readonly users = [
        {
            userId: 1,
            email: 'john@gmail.com',
            password: 'changeme',
            fullName: 'john smith',
            permissions: []
        },
        {
            userId: 2,
            email: 'maria@gmail.com',
            password: 'guess',
            fullName: 'guess customer',
            permissions: []
        }
    ];

    constructor(private userRepository: CommonUserRepository) {}

    async getUserForAuthentication(email: string): Promise<User | undefined> {
        return this.users.find((user) => {
            return user.email === email;
        });
        //return this.userRepository.getOne(email);
    }

    findUserDetail(email: string): Promise<User> {
        return this.userRepository.getDetail(email);
    }
}
