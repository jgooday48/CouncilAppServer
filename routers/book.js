const { Router } = require('express');

const authenticator = require("../middleware/authenticator");
const bookController = require('../controllers/book.js');

const bookRouter = Router();

bookRouter.get("/", bookController.index);
bookRouter.post("/", bookController.create);
bookRouter.get("/:id", bookController.show);
bookRouter.patch("/:id", bookController.update);
bookRouter.delete("/:id", bookController.destroy);

module.exports = bookRouter;
