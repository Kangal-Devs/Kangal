const express = require("express")
const router = express.Router();
const gameController = require("../controllers/gameController.js")

router.post("/create_game",gameController.create_game)

module.exports.router = router