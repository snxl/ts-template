import User from '../models/user';

export default interface IUserValidation {
    findOne: (email: string) => Promise<User | null>;
}
