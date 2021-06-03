const express = require("express");
const app = express();
const userRouter = require("./routes/userroutes");
var db = require("./db");
var AuthController = require("./auth/authController");

app.get("/api/", (req, res) => {
  res.send("Node JS app Started");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", AuthController);
app.use("/api/user", userRouter);

module.exports = app;
