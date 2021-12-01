import { Request, Response } from 'express';

import BaseSchema from '../../baseSchema';

class User {
    async store(req: Request, res: Response): Promise<Response> {
        return await res.status(200).json({ status: 'ok' });
    }
}

export const user = new User();
