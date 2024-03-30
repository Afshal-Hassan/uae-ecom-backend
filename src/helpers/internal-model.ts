export class GenericResponse<T> {
    private message: string;
    private data: T;

    constructor(message: string, data: T) {
        this.message = message;
        this.data = data;
    }

    getMessage(): string {
        return this.message;
    }

    getData(): T {
        return this.data;
    }
}