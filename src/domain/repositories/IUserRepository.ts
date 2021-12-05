import User from '../models/user';

export default interface IUserRepo {
    create: (user: User) => Promise<User>;
    findAll: () => Promise<User[] | null>;
    findOne: (email: string) => Promise<User | null>;
}
