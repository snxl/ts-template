import IHashClient from '@src/domain/clients/IHashClientRepository';
import IJsonWebToken from '@src/domain/clients/IJsonWebTokenRepository';
import User from '@src/domain/models/user';
import IUserRepo from '@src/domain/repositories/IUserRepository';

import { ICreateUserInput, ICreateUserOutput } from './createUserDTO';

export default class CreateUserImpl {
    constructor(private userRepo: IUserRepo, private hashClient: IHashClient, private tokenClient: IJsonWebToken) {}

    public async run(input: ICreateUserInput): Promise<ICreateUserOutput> {
        const passwordHashed = await this.hashClient.encrypt(input.password);
        const user = new User(input.name, input.email, passwordHashed);

        const userResult = await this.userRepo.create(user);

        const token = await this.tokenClient.createPayload({
            id: userResult.id,
            email: userResult.email,
        });

        return { token };
    }
}
