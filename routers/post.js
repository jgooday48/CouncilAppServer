const { Router } = require('express');

const postController = require('../controllers/post.js');
const authenticator = require('../middleware/authenticator.js');

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.get("/:id", postController.show);
postRouter.post("/", postController.create);
postRouter.patch("/:id",authenticator, postController.update);
postRouter.delete("/:id",authenticator, postController.destroy);

module.exports = postRouter;
