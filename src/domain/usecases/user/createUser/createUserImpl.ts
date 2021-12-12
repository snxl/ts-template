import IHashClient from '@src/domain/clients/IHashClientRepository';
import IJsonWebToken from '@src/domain/clients/IJsonWebTokenRepository';
import User from '@src/domain/models/user';
import IErrors from '@src/domain/repositories/IErrorsRepository';
import IUserRepo from '@src/domain/repositories/IUserRepository';
import UserRepoImpl from '@src/infra/repositories/userRepoImpl';

import { ICreateUserInput, ICreateUserOutput } from './createUserDTO';
import ValidateCreateUser from './validateMannager';

export default class CreateUserImpl {
    constructor(private userRepo: IUserRepo, private hashClient: IHashClient, private tokenClient: IJsonWebToken) {}

    public async run(input: ICreateUserInput): Promise<ICreateUserOutput | IErrors> {
        const passwordHashed = await this.hashClient.encrypt(input.password);
        const user = new User(input.name, input.email, passwordHashed);

        const validateFields = new ValidateCreateUser(input, new UserRepoImpl());

        await validateFields.build();

        if (!validateFields.isValid())
            return {
                failure: true,
                errors: validateFields.getErrors(),
            };

        const userResult = await this.userRepo.create(user);

        const token = await this.tokenClient.createPayload({
            id: userResult.id,
            email: userResult.email,
        });

        return {
            failure: false,
            token,
        };
    }
}
