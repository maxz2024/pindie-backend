const {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
  sendCategoryDeleted,
} = require("../controllers/categories");
const {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
} = require("../middlewares/categories");
const { sendCategoryUpdated } = require("../controllers/categories");
const categoriesRouter = require("express").Router();
const { checkAuth, checkRoleAuth } = require("../middlewares/auth");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post(
  "/categories",
  checkAuth,
  checkRoleAuth,
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id",
  checkAuth,
  checkRoleAuth,
  findCategoryById,
  checkEmptyName,
  updateCategory,
  sendCategoryUpdated
);
categoriesRouter.delete("/categories/:id", checkAuth, checkRoleAuth, deleteCategory, sendCategoryDeleted);
module.exports = categoriesRouter;
