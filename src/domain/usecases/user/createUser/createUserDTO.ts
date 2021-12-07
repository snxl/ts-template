export interface ICreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface IUserOutput {
    id: number;
    name: string;
    email: string;
}

export interface ICreateUserOutput {
    token: string;
}
