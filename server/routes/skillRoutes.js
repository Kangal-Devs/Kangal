const express = require("express")
const router = express.Router()
const skillControler = require("../controllers/skillController.js")

router.post("/create_skill",skillControler.create_skill)
router.post("/get_skills",skillControler.get_skills)
router.post("/get_skill",skillControler.get_skill)

module.exports.router = router