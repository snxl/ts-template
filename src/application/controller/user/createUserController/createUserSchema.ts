import ICreateUser from '@src/domain/repositories/ICreateUserRepository';
import regex from '@src/shared/config/regex';

import BaseSchema from '../../baseSchema';

const { email, length, capital, lowercase, number } = regex;

class CreateUserSchema extends BaseSchema {
    constructor(body: ICreateUser) {
        super();
        this.body = body;

        const fields: Array<string> = ['name', 'email', 'password', 'passwordConfirm'];

        for (const field of fields) {
            if (this.body && !this.body[field]) {
                this.errors.push(`${field} is empty`);
            }

            if (field === fields[1] && !email.test(this.body[field])) {
                this.errors.push(`${field} must be an email`);
            }

            if (field === fields[2] && !lowercase.test(this.body[field])) {
                this.errors.push(`${field} must be contain a lowercase letter`);
            }

            if (field === fields[2] && !capital.test(this.body[field])) {
                this.errors.push(`${field} must be contain a capital letter`);
            }

            if (field === fields[2] && !number.test(this.body[field])) {
                this.errors.push(`${field} must be contain a number`);
            }

            if (field === fields[2] && !length(8).test(this.body[field])) {
                this.errors.push(`${field} must be contain eight characters`);
            }

            if (field === fields[3] && this.body[field] !== this.body[fields[2]]) {
                this.errors.push(`${field} must be the same as the password`);
            }
        }
    }
}

export default CreateUserSchema;
