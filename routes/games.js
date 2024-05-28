const gamesRouter = require("express").Router();
const { checkAuth, checkRoleAuth } = require("../middlewares/auth");
const {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
  checkIsVoteRequest,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.post(
  "/games",
  checkAuth,
  checkRoleAuth,
  findAllGames,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  createGame,
  sendGameCreated
);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id",
  checkAuth,
  checkRoleAuth,
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  updateGame,
  sendGameUpdated
);
gamesRouter.delete("/games/:id", checkAuth, checkRoleAuth, deleteGame, sendGameDeleted);
module.exports = gamesRouter;
