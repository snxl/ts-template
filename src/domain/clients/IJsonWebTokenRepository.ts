import IPayloadToken from '../repositories/IPayloadTokenRepository';

export default interface IJsonWebToken {
    createPayload: (payload: IPayloadToken) => Promise<string | Error>;
    getPayload: (token: string) => Promise<IPayloadToken | Error>;
}
