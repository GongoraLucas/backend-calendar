const { validationResult } = require("express-validator");

const verifyErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};
    for (const [key, value] of Object.entries(errors.mapped())) {
      formattedErrors[key] = value.msg;
    }
    return res.status(400).json({
      ok: false,
      errors: formattedErrors,
    });
  }

  next();
};

module.exports = {
  verifyErrors,
};
