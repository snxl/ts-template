export default interface IRegexp {
    email: RegExp;
    capital: RegExp;
    lowercase: RegExp;
    length: (num: number) => RegExp;
    number: RegExp;
}
