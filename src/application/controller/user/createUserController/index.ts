import { Request, Response } from 'express';

import CreateUserSchema from '../createUserSchema';

class User {
    async store(req: Request, res: Response): Promise<Response> {
        const schema = new CreateUserSchema(req.body);

        if (!schema.isValid()) {
            return res.status(400).json({ error: schema.getErrors() });
        }

        return res.status(200).json({ status: 'ok' });
    }
}

export const user = new User();
