import ICreateUser from '@src/domain/repositories/ICreateUserRepository';

import BaseSchema from '../../../../shared/helpers/baseSchemaErrors';

class CreateUserSchema extends BaseSchema {
    private fields: Array<string>;

    constructor(body: ICreateUser) {
        super();
        this.body = body;

        this.fields = ['name', 'email', 'password', 'passwordConfirm'];

        for (const field of this.fields) {
            if (this.body && !this.body[field]) {
                this.errors.push(`${field} is empty`);
            }
        }
    }
}

export default CreateUserSchema;
