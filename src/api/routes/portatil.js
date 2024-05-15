const { insertPortatiles, getPortatiles, updatePortatil, deletePortatil } = require("../controllers/portatil");

const portatilesRouter = require("express").Router();

portatilesRouter.post("/send", insertPortatiles);
portatilesRouter.get("/", getPortatiles);
portatilesRouter.put("/:id", updatePortatil);
portatilesRouter.delete("/:id", deletePortatil);

module.exports = portatilesRouter