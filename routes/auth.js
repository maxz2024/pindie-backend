const authRouter = require("express").Router();
const { login } = require("../controllers/auth.js");

authRouter.post("/login", login);

module.exports = authRouter;

