const express = require("express");

const jwt = require("jsonwebtoken");

const { UserModel } = require("../Model/user.model");
const { Auth } = require("../middelware/authentication");

const UserRoutes = express.Router();

UserRoutes.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    const users = await UserModel.find({ email });
    if (users.length > 0) {
      res.status(200).send("email is already exist try with new email");
    } else {
      const user = new UserModel({
        name,
        email,
        password,
      });
      await user.save();
      res.status(201).send("user Registered successfully");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

UserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ userId: user._id }, process.env.key);
        res.status(200).send({
          msg: "Login Successfull",
          name: user.name,
          email: user.email,
          token: token,
          userType: user.userType,
        });
      } else {
        res.status(200).send("Wrong Credntials");
      }
    } else {
      res.status(200).send("Wrong Credntials");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

UserRoutes.get("/checkAuth", Auth, async (req, res) => {
  try {
    res.status(200).send("Authorised");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = { UserRoutes };
