abstract class BaseSchema {
    protected errors: string[] = [];
    protected body: any;

    public getErrors(): string[] {
        return this.errors;
    }

    public isValid(): boolean {
        return this.errors.length === 0;
    }
}

export default BaseSchema;
