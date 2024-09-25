interface IErrorOptions {
    [key: string]: any;
}

class CustomError extends Error {
    options: IErrorOptions;

    constructor(message: string, options: IErrorOptions) {
        super(message);
        this.name = this.constructor.name;
        this.options = options;
    }
}

export { CustomError };