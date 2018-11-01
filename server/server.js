const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
//load configurations
require("dotenv").config();
//load routes
const router = require("./router");

const app = express();
//add body parser middleware and cookieParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//setup db connection
mongoose
  .connect(
    process.env.DATABASE,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )

  .then(() => console.log("Connected to the Database..."))
  .catch(err => console.log("Error in connecting to the db ", err));

router(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is listening at Port ${port}`);
});
