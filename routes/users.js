const {sendAllUsers, sendUserCreated, sendUserById} = require("../controllers/users");
const {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail} = require("../middlewares/users");
const {sendUserUpdated, sendUserDeleted} = require("../controllers/users");

const usersRouter = require("express").Router();
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post("/users", checkEmptyNameAndEmailAndPassword, createUser, sendUserCreated);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put("/users/:id", findUserById,checkEmptyNameAndEmail, updateUser, sendUserUpdated);
usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);
module.exports = usersRouter;
