const createError = require('http-errors');

// Check for whether the req.user attached by tokenAuth has the 'admin' role to enable rights management

const authorizeAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') throw new createError.Unauthorized();
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = authorizeAdmin;