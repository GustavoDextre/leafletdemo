const router = require("express").Router();
const { MapaController } = require("../controller");

router.get("/", MapaController.index);

module.exports = router;