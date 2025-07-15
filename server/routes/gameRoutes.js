const express = require("express")
const router = express.Router();
const gameController = require("../controllers/gameController.js")

router.post("/create_game",gameController.create_game)
router.get("/get_all_games",gameController.get_all_games)
router.post("/get_game",gameController.get_game)


module.exports.router = router