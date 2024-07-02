const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "superadmin"],
  },
});
userSchema.statics.findUserByCredentials = function (
  login,
  password
) {
  return this.findOne({
    $or: [{ email: login }, { username: login }],
  }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Неправильные логин или пароль"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Неправильные логин или пароль"));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
