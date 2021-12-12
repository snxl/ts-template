import { getRepository, Repository } from 'typeorm';

import User from '@src/domain/models/user';
import IUserRepo from '@src/domain/repositories/IUserRepository';

import { UserModel } from '../database/postgres/entities/user';

export default class UserRepoImpl implements IUserRepo {
    private user: Repository<UserModel>;
    constructor() {
        this.user = getRepository(UserModel);
    }

    public async create(user: User): Promise<User> {
        const createUser = this.user.create(user);

        await this.user.save(createUser);
        return createUser;
    }
    public async findAll(): Promise<User[]> {
        return this.user.find();
    }

    public async findOne(email: string): Promise<User | undefined> {
        return this.user.findOne({
            where: {
                email,
            },
        });
    }
}
