const users = require("../models/user");
const bcrypt = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({});
  next();
};

const findUserById = async (req, res, next) => {
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);

    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите имя, email и пароль" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "Пользователь с таким email уже существует" })
      );
  } else {
    next();
  }
};

const checkRoleExists = async (req, res, next) => {
  if (["superadmin", "admin", "user"].includes(req.body.role)) {
    next();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введена ошибочная роль" }));
  }
};

const checkRoleAdd = async (req, res, next) => {

    if ((req.isGuest && req.body.role !== "user") || (req.user && req.user.role == "admin" && req.body.role !== "user")) {
      res.status(400).send(JSON.stringify({
        message: `Вы не имеете прав для создания пользователя с ролью ${req.body.role}`,
      }));
    }
    else if (req.user && req.user.role == "user") {
      res
        .status(400)
        .send(
          JSON.stringify({
            message: "Вы не имеете прав для создания пользователя ",
          })
        );
    }
    else {
      next()
    }
};

const getMe = async (req, res, next) => {
  req.user = await users.findById(req.user._id);
  next();
};

const filterPassword = (req, res, next) => {
  const filterUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  };
  if (req.user) {
    req.user = filterUser(req.user);
  }
  if (req.usersArray) {
    req.usersArray = req.usersArray.map(filterUser);
  }
  next();
};
module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  checkRoleExists,
  checkRoleAdd,
  filterPassword,
  hashPassword,
  getMe,
};
