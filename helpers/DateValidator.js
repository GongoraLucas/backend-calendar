const moment = require("moment");

const verifyDate = (value) => {
  const date = moment(value);
  return date.isValid() ? true : false;
};

module.exports = {
  verifyDate,
};
