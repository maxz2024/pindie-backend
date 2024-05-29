const users = require("../models/user.js");
const jwt = require("jsonwebtoken");
const path = require("path");

const login = (req, res) => {
  const { login, password } = req.body;
  users
    .findUserByCredentials(login, password)
    .then((user)=> {
      if (req.headers.origin == "http://localhost:3001" && user.role == "user"){
        return Promise.reject(new Error("Нет доступа"))
      }
      return user;
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      return { user, token };
    })
    .then(({ user, token }) => {
      res
        .status(200)
        .send({ _id: user._id, username: user.username, email: user.email, role: user.role, jwt: token });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

const sendIndex = (req, res) => {
  if (req.cookies.jwt) {
    try {
      jwt.verify(req.cookies.jwt, "some-secret-key");
      return res.redirect("/admin/dashboard");
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
}; 
module.exports = { login, sendIndex, sendDashboard };
