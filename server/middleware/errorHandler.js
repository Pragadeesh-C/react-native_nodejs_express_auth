const constants = require('../constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                message: err.message
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT FOUND",
                message: err.message
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                message: err.message
            })
            break;
        case constants.VALIDATION_ERROR:
            res.json({
                title: "VALDIATION ERROR",
                message: err.message
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "SERVER ERROR",
                message: err.message
            })
            break;
        default:
            res.json({
                title: "Error",
            })
            break;
    }
}

module.exports = errorHandler