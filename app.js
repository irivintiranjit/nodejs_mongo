const express = require("express");
const app = express();
const userRouter = require("./routes/userroutes");
var db = require("./db");
var AuthController = require("./auth/authController");

app.get("/api/", (req, res) => {
  res.send("Node JS app Started");
});

/*Registering for CORS  */
app.all("*", (req, res) => {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTION");
  next();
});
/*Registering to read the request bodt in json format */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*Registering the routes */
app.use("/api/auth", AuthController);
app.use("/api/user", userRouter);

module.exports = app;
