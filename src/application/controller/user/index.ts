import BaseSchema from '../baseSchema';

class CreateUserSchema extends BaseSchema {
    constructor(body: any) {
        super();
        this.body = body;
    }
}

export default CreateUserSchema;
