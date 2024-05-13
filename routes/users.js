const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
} = require("../controllers/users");
const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  filterPassword,
} = require("../middlewares/users");
const { sendUserUpdated, sendUserDeleted } = require("../controllers/users");

const usersRouter = require("express").Router();
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.post(
  "/users",
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.put(
  "/users/:id",
  findUserById,
  checkEmptyNameAndEmail,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);
module.exports = usersRouter;
