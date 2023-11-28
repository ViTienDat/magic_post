const jwt = require("jsonwebtoken");

const createToken = (id, email, role, point_id) => {
  return jwt.sign({ id, email, role, point_id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = createToken;
