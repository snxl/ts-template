import bcrypt from 'bcrypt';

import IHashClient from '@src/domain/clients/IHashClientRepository';

class BCryptHashClient implements IHashClient {
    public async encrypt(plain: string): Promise<string> {
        return bcrypt.hash(plain, 12);
    }
}

export default BCryptHashClient;
