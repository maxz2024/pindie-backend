const {sendAllCategories, sendCategoryCreated, sendCategoryById} = require("../controllers/categories");
const {findAllCategories, createCategory, findCategoryById} = require("../middlewares/categories");

const categoriesRouter = require("express").Router();

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post("/categories", createCategory, sendCategoryCreated);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
module.exports = categoriesRouter;
