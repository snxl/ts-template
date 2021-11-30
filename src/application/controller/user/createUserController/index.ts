import { Request, Response } from 'express';

import BaseSchema from '../../baseSchema';

class User {
    store(req: Request, res: Response) {
        return null;
    }
}

export const user = new User();
