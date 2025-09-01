const userCommonLessonController = require("../controllers/userCommonLessonController.js")
const express = require("express")
const router = express.Router()

router.post("/create_user_common_lesson",userCommonLessonController.create_user_common_lesson)
router.post("/update_user_common_lesson",userCommonLessonController.update_user_common_lesson)
router.delete("/delete_user_common_lesson/:userCommonLessonId",userCommonLessonController.delete_user_common_lesson)

module.exports.router = router