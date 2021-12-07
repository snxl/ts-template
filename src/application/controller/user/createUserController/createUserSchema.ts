import { Repository, getRepository } from 'typeorm';

import User from '@src/domain/models/user';
import ICreateUser from '@src/domain/repositories/ICreateUserRepository';
import IUserValidation from '@src/domain/repositories/IUserValidationRepository';
import { UserModel } from '@src/infra/database/postgres/entities/user';
import regex from '@src/shared/config/regex';

import BaseSchema from '../../baseSchema';

const { email, length, capital, lowercase, number } = regex;

class CreateUserSchema extends BaseSchema {
    private user: Repository<User>;
    private fields: Array<string>;

    constructor(body: ICreateUser, private userValidationImpl: IUserValidation) {
        super();
        this.body = body;
        this.user = getRepository(UserModel);

        this.fields = ['name', 'email', 'password', 'passwordConfirm'];
    }

    public async validate(): Promise<void> {
        for (const field of this.fields) {
            if (this.body && !this.body[field]) {
                this.errors.push(`${field} is empty`);
            }

            if (field === this.fields[1] && !email.test(this.body[field])) {
                this.errors.push(`${field} must be an email`);
            }

            if (field === this.fields[2] && !lowercase.test(this.body[field])) {
                this.errors.push(`${field} must be contain a lowercase letter`);
            }

            if (field === this.fields[2] && !capital.test(this.body[field])) {
                this.errors.push(`${field} must be contain a capital letter`);
            }

            if (field === this.fields[2] && !number.test(this.body[field])) {
                this.errors.push(`${field} must be contain a number`);
            }

            if (field === this.fields[2] && !length(8).test(this.body[field])) {
                this.errors.push(`${field} must be contain eight characters`);
            }

            if (field === this.fields[3] && this.body[field] !== this.body[this.fields[2]]) {
                this.errors.push(`${field} must be the same as the password`);
            }

            if (field === this.fields[1] && (await this.validateEmail(this.body[field]))) {
                this.errors.push(`${field} already exists`);
            }
        }
    }

    private async validateEmail(email: string): Promise<null | User> {
        return this.userValidationImpl.findOne(email);
    }
}

export default CreateUserSchema;
