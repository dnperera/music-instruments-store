const isAdmin = function(req, res, next) {
  console.log(req.user);
  if (req.user.role === 0) {
    return res.send("You are not authorized!.");
  }
  next();
};
module.exports = isAdmin;
