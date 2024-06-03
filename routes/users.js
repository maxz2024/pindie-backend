const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendMe,
  sendResult,
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
  getMe,
  checkRoleAdd,
  getUsernameOrEmailFromRoute,
} = require("../middlewares/users");
const { sendUserUpdated, sendUserDeleted } = require("../controllers/users");
const { checkAuth, checkRoleAuth } = require("../middlewares/auth");

const usersRouter = require("express").Router();
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/me", checkAuth, getMe, sendMe);
usersRouter.post(
  "/users",
  checkAuth,
  findAllUsers,
  checkIsUserExists,
  checkRoleExists,
  checkRoleAdd,
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/check-exist/:login", getUsernameOrEmailFromRoute, findAllUsers, checkIsUserExists, sendResult);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);


usersRouter.put(
  "/users/:id",
  checkAuth,
  checkRoleAuth,
  findUserById,
  checkEmptyNameAndEmail,
  checkRoleExists,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", checkAuth, checkRoleAuth, deleteUser, sendUserDeleted);
module.exports = usersRouter;
