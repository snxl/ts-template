export interface ICreateUserInput {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserOutput {
    id: number;
    name: string;
    email: string;
}
