const { Router } = require('express');

const shareController = require('../controllers/share.js');

const shareRouter = Router();

shareController.get("/", shareRouter.index);
shareController.post("/", shareRouter.create);
shareController.get("/:id", shareRouter.show);
shareController.patch("/:id",shareRouter.update);
shareController.delete("/:id", shareRouter.destroy);

module.exports = shareRouter;
