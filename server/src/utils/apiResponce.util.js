class apiResponce {
    constructor(
        statusCode,
        message,
        data
    ){
        this.statusCode = statusCode,
        this.message = message,
        this.data = data,
        this.success = true
    }
}

export { apiResponce };