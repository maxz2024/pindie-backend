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

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id",
  findCategoryById,
  updateCategory,
  sendCategoryUpdated
);
categoriesRouter.delete("/categories/:id", deleteCategory, sendCategoryDeleted);
module.exports = categoriesRouter;
