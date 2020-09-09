const createError = require('http-errors');

exports.throw400 = (req, res, next) => {
    // We create an error and attach the status code
    // const error = new Error('No such resource');
    // error.status = 400;
    const error = new createError.BadRequest();
    // We next() the error so the error handler middleware runs
    next(error);
}

exports.handleErrors = (err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message,
            details: err.validator || null
        }
    });
}