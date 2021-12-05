export default interface IHashClient {
    encrypt: (plain: string) => Promise<string>;
}
