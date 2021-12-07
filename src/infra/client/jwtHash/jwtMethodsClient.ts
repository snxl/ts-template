import jwt from 'jsonwebtoken';

import IJsonWebToken from '@src/domain/clients/IJsonWebTokenRepository';
import IPayloadTokenRepository from '@src/domain/repositories/IPayloadTokenRepository';
import config from '@src/shared/config/keys/index';

export default class JsonWebToken implements IJsonWebToken {
    public async createPayload(payload: IPayloadTokenRepository): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, config.SECRET_TOKEN, { expiresIn: '15min' }, (err, token) => {
                if (err) return reject(err);
                return resolve(token);
            });
        });
    }
    public async getPayload(token: string): Promise<IPayloadTokenRepository> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.SECRET_TOKEN, (err: Error, payload: IPayloadTokenRepository) => {
                if (err) return reject(err);
                return resolve(payload);
            });
        });
    }
}
