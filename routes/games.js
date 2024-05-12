// Файл routes/games.js

const gamesRouter = require("express").Router();

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
  findAllGames,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  createGame,
  sendGameCreated
);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id", // Слушаем запросы по эндпоинту
  // Шаг 1. Находим игру по id из запроса
  findGameById,
  // Шаг 2. Выполняем проверки для корректного обновления
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  // Шаг 3. Обновляем запись с игрой
  updateGame,
  // Шаг 4. Возвращаем на клиент ответ с результатом обновления
  sendGameUpdated
);
gamesRouter.delete("/games/:id", deleteGame, sendGameDeleted);
module.exports = gamesRouter;
