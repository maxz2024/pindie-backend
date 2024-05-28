const jwt = require("jsonwebtoken");
const users = require("../models/user");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (req.url.includes("/users") && !authorization){
    req.isGuest = true
    next();
  }
  else {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Необходима авторизация" });
    }

    const token = authorization.replace("Bearer ", "");

    try {
      req.user = await users.findById(jwt.verify(token, "some-secret-key")._id);
    } catch (err) {
      return res.status(401).send({ message: "Необходима авторизация" });
    }

    next();
  }
};

const checkCookiesJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
}; 

const checkRoleAuth = async (req, res, next) => {
  if (req.user.role != "user") {
    next()
  }
  else {
    return res.status(401).send({ message: "Ошибка доступа" });
  }
}
module.exports = { checkAuth, checkCookiesJWT, checkRoleAuth};

