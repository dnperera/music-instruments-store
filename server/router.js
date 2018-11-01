const { signup, login } = require("./controllers/authentication");
module.exports = function(app) {
  app.get("/", function(req, res) {
    console.log("Cookies: ", req.cookies);
    res.json({ message: "Welcome to music store" });
  });

  app.post("/api/signup", signup);
  app.post("/api/login", login);
};
