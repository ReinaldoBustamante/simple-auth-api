
export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message)
    }

    public static badRequest(message: string) {
        return new CustomError(400, message)
    }
    public static unAuthorized(message: string) {
        return new CustomError(401, message)
    }
    public static notFound(message: string) {
        return new CustomError(404, message)
    }

    public static conflict(message: string) {
        return new CustomError(409, message)
    }

    public static internal(message: string) {
        return new CustomError(500, message)
    }
}