const { Router } = require('express');

const authenticator = require("../middleware/authenticator");
const postController = require('../controllers/share.js');

const postRouter = Router();

postRouter.get("/", authenticator, postController.index);
postRouter.get("/",postController.index);
postRouter.post("/", postController.create);
postRouter.get("/:id", postController.show);
postRouter.patch("/:id",authenticator,postController.update);
postRouter.delete("/:id", authenticator, postController.destroy);

module.exports = postRouter;
