class apiError extends Error {
    constructor(
        statusCode,
        message,
        errors = []
    ){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.success = false,
        this.errors = errors
    }
}

export { apiError };