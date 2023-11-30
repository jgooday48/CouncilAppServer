const { Router } = require('express');

const postController = require('../controllers/post.js');
const authenticator = require('../middleware/authenticator.js');

const postRouter = Router();

postRouter.get("/", postController.index);//get all
postRouter.get("/:id", postController.show);//get by name
postRouter.get("/user/:name", postController.byUser);//get by user_name
postRouter.post("/", postController.create);//create post
postRouter.patch("/:id", postController.update);//update post by id
postRouter.delete("/:id", postController.destroy);//delete post by id

module.exports = postRouter;
