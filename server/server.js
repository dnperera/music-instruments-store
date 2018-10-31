const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
//load configurations
require("dotenv").config();

//add body parser middleware and cookieParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//setup db connection
mongoose
  .connect(
    process.env.DATABASE,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to the Database..."))
  .catch(err => console.log("Error in connecting to the db ", err));

app.get("/", function(req, res) {
  console.log("Cookies: ", req.cookies);
  res.json({ message: "Welcome to music store" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is listening at Port ${port}`);
});
