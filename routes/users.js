const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendMe,
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
  checkRoleExists,
  filterPassword,
  hashPassword,
} = require("../middlewares/users");
const { sendUserUpdated, sendUserDeleted } = require("../controllers/users");
const { checkAuth } = require("../middlewares/auth");

const usersRouter = require("express").Router();
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/me", checkAuth,sendMe);
usersRouter.post(
  "/users",
  checkAuth,
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  checkRoleExists,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.put(
  "/users/:id",
  checkAuth,
  findUserById,
  checkEmptyNameAndEmail,
  checkRoleExists,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);
module.exports = usersRouter;
