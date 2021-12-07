import IPayloadToken from '../repositories/IPayloadTokenRepository';

export default interface IJsonWebToken {
    createPayload: (payload: IPayloadToken) => Promise<string>;
    getPayload: (token: string) => Promise<IPayloadToken>;
}
