const User = require("../models/User");
exports.auth = function(req, res, next) {
  const token = req.cookies.m_auth;
  console.log("incoming token -", token);
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({
        isAuth: false,
        error: true
      });
    }
    //if the user exist add token  & user object to req object
    req.token = token;
    req.user = user;
    next();
  });
};
