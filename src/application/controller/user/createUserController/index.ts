import { Request, Response } from 'express';

import CreateUserImpl from '@src/domain/usecases/user/createUser/createUserImpl';
import BCryptHashClient from '@src/infra/client/hashClient/bcryptHashClient';
import JsonWebToken from '@src/infra/client/jwtHash/jwtMethodsClient';
import UserRepoImpl from '@src/infra/repositories/userRepoImpl';

import CreateUserSchema from './createUserSchema';

class User {
    async store(req: Request, res: Response): Promise<Response> {
        const schema = new CreateUserSchema(req.body);

        if (!schema.isValid()) {
            return res.status(400).json({ error: schema.getErrors() });
        }

        const createUser = new CreateUserImpl(new UserRepoImpl(), new BCryptHashClient(), new JsonWebToken());

        const userResult = await createUser.run({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        return (userResult.failure && res.status(400).json(userResult)) || res.status(200).json(userResult);
    }
}

export const user = new User();
