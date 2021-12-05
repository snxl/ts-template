import IHashClient from '@src/domain/clients/IHashClientRepository';
import User from '@src/domain/models/user';
import IUserRepo from '@src/domain/repositories/IUserRepository';

import { ICreateUserInput, ICreateUserOutput } from './createUserDTO';

export default class CreateUserImpl {
    constructor(private userRepo: IUserRepo, private hashClient: IHashClient) {}

    public async run(input: ICreateUserInput): Promise<ICreateUserOutput> {
        const passwordHashed = await this.hashClient.encrypt(input.password);
        const user = new User(input.name, input.email, passwordHashed);

        const userResult = await this.userRepo.create(user);

        return {
            id: userResult.id,
            name: userResult.name,
            email: userResult.email,
        };
    }
}
