const {sendAllUsers, sendUserCreated, sendUserById} = require("../controllers/users");
const {findAllUsers, createUser, findUserById, updateUser} = require("../middlewares/users");
const {sendUserUpdated} = require("../controllers/users");

const usersRouter = require("express").Router();
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post("/users", createUser, sendUserCreated);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put("/users/:id", findUserById, updateUser, sendUserUpdated);
module.exports = usersRouter;
