const { signup, login, logout } = require("./controllers/authentication");
const { addBrand, getBrands } = require("./controllers/brands");
//load authentication middleware
const { auth } = require("./middleware/authenticate");
const isAdmin = require("./middleware/isAdmin");
module.exports = function(app) {
  app.get("/", function(req, res) {
    console.log("Cookies: ", req.cookies);
    res.json({ message: "Welcome to music store" });
  });

  app.get("/api/auth", auth, (req, res) => {
    res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history
    });
  });

  app.post("/api/signup", signup);
  app.post("/api/login", login);
  app.get("/api/logout", auth, logout);

  app.post("/api/product/brand", auth, isAdmin, addBrand);
  app.get("/api/product/brands", getBrands);
};
