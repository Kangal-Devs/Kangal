const express = require("express")
const router = express.Router()
const commonLessonController = require("../controllers/commonLessonController.js")

router.post("/create_common_lesson",commonLessonController.create_common_lesson)
router.post("/get_all_common_lessons",commonLessonController.get_all_common_lessons)
router.post("/get_common_lesson",commonLessonController.get_common_lesson)

module.exports.router = router