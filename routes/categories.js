const {sendAllCategories, sendCategoryCreated, sendCategoryById} = require("../controllers/categories");
const {findAllCategories, createCategory, findCategoryById, updateCategory} = require("../middlewares/categories");
const {sendCategoryUpdated} = require("../controllers/categories");
const categoriesRouter = require("express").Router();

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post("/categories", createCategory, sendCategoryCreated);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put("/categories/:id", findCategoryById, updateCategory, sendCategoryUpdated);
module.exports = categoriesRouter;
