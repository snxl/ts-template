import { Repository, getRepository } from 'typeorm';

import User from '@src/domain/models/user';
import IUserValidation from '@src/domain/repositories/IUserValidationRepository';
import { UserModel } from '@src/infra/database/postgres/entities/user';
import regex from '@src/shared/config/regex';
import BaseSchema from '@src/shared/helpers/baseSchemaErrors';

import { ICreateUserInput } from './createUserDTO';

const { email, length, capital, lowercase, number } = regex;

export default class ValidateCreateUser extends BaseSchema {
    private fields: Array<string>;
    private user: Repository<User>;
    constructor(body: ICreateUserInput, private userValidationImpl: IUserValidation) {
        super();
        this.body = body;
        this.fields = Object.keys(this.body);
        this.user = getRepository(UserModel);
    }

    public async build() {
        for (const field of this.fields) {
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
