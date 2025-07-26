const express = require("express")
const router = express.Router()
const commonLessonController = require("../controllers/commonLessonController.js")

router.post("/create_common_lesson",commonLessonController.create_common_lesson)

module.exports.router = router