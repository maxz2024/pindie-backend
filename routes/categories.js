const {sendAllCategories, sendCategoryCreated} = require("../controllers/categories");
const {findAllCategories, createCategory} = require("../middlewares/categories");

const categoriesRouter = require("express").Router();

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post("/categories", createCategory, sendCategoryCreated);
module.exports = categoriesRouter;
