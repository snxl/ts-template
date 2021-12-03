import regex from '@src/shared/config/regex';

import BaseSchema from '../baseSchema';

class CreateUserSchema extends BaseSchema {
    readonly regexEmail: RegExp;

    constructor(body: any) {
        super();
        this.body = body;

        const fields: Array<string> = ['name', 'email', 'password', 'passwordConfirm'];

        for (const field of fields) {
            if (this.body && !this.body[field]) {
                this.errors.push(`${field} is empty`);
            }

            if (field === fields[1] && !regex.email.test(this.body[field])) {
                this.errors.push(`${field} must be an email`);
            }

            if (field === fields[2] && this.body[field].length < 8) {
                this.errors.push(`${field} must contain eight characters`);
            }

            if (field === fields[3] && this.body[field] !== this.body[fields[2]]) {
                this.errors.push(`${field} must be the same as the password`);
            }
        }
    }
}

export default CreateUserSchema;
