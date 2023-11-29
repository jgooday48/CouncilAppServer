const { Router } = require('express');

const authenticator = require("../middleware/authenticator");
const shareController = require('../controllers/share.js');

const shareRouter = Router();

shareRouter.get("/", shareController.index);

shareRouter.post("/", shareController.create);
shareRouter.get("/:id", shareController.show);
shareRouter.patch("/:id",shareController.update);
shareRouter.delete("/:id", shareController.destroy);

module.exports = shareRouter;

