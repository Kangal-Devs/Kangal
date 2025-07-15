const express = require("express")
const router = express.Router()
const skillControler = require("../controllers/skillController.js")

router.post("/create_skill",skillControler.create_skill)

module.exports.router = router