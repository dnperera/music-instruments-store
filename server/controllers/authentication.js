const User = require("../models/User");

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  if (!email || !password || !firstname || !lastname) {
    return res
      .status(422)
      .json({ error: "Email ,password,first name & last name  must provide." });
  }
  //then check email aready exist
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    //if email exist return error
    if (existingUser) {
      return res.status(422).json({ error: "Email is already registered!." });
    }
    //if the email does not exist ,create new record
    const user = new User({
      email,
      password,
      firstname,
      lastname
    });
    user.save(function(err, newUser) {
      if (err) {
        return res.json({ success: false, err });
      }
      res.status(200).json({ success: true, userdata: newUser });
    });
  });
};

exports.login = function(req, res, next) {
  //check user email exist
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        loginSuccess: false,
        message: "Authentication fails, email doe not exist"
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Authentication fails, Incorrect password!."
        });
      }
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res
          .cookie("m_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
};
