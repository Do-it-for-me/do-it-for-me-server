const createError = require("http-errors");

const authorizeUser = async (req, res, next) => {
  try {
    console.log(req.user._id, req.user.role, req.params.id);
    if (
      req.user.role === "admin" ||
      String(req.user._id) === String(req.params.id)
    )
      req.canSeeFullUser = true;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorizeUser;
