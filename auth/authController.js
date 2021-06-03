const express = require("express");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const config = require("../config");
var router = express.Router();
var User = require("../model/user");
const { route } = require("../routes/userroutes");

/*These are to register the json and also to read the json object from the requst body */
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/*
  @name->User name
  @password-> User password
  @rmail-> User email

*/
router.post("/register", (req, res) => {
  if (
    req.body.username != undefined &&
    req.body.password != undefined &&
    req.body.email != undefined
  ) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Encounter error while creating user" });
        } else {
          return res
            .status(200)
            .json({ message: "User registered successfully" });
        }
      }
    );
  } else {
    res.status(500).json({
      messge: "User Name and Password should be present. Please review",
    });
  }
});

router.post("/login", (req, res) => {
  if (
    req.body.username != undefined &&
    req.body.password != undefined &&
    req.body.email != undefined
  ) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Encounter error while fetching user" });
      } else {
        if (!user) {
          return res.status(404).json({ message: "User not available" });
        } else {
          var passWordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (!passWordIsValid) {
            return res.status(401).json({ message: "Password is not valid" });
          } else {
            var token = jwtToken.sign({ id: user._id }, config.secret, {
              expiresIn: 43200,
            });

            return res.status(200).json({ auth: true, token: token });
          }
        }
      }
    });
  } else {
    res.status(500).json({
      messge: "User Name and Password should be present. Please review",
    });
  }
});

router.get("/validate", (req, res) => {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Token passed is not valid" });
  } else {
    jwtToken.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ message: "Internal error" });
      } else {
        User.findById(decoded.id, { password: 0 }, (err, user) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Internal Error while retreviwing the user" });
          } else {
            if (!user) {
              return res
                .status(401)
                .json({ message: "User not available in system" });
            } else {
              return res.status(200).json({ userdetails: user });
            }
          }
        });
      }
    });
  }
});

module.exports = router;
