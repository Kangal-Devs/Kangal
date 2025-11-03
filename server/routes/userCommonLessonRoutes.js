const userCommonLessonController = require("../controllers/userCommonLessonController.js")
const express = require("express")
const router = express.Router()

router.post("/create_user_common_lesson",userCommonLessonController.create_user_common_lesson)
router.put("/update_user_common_lesson",userCommonLessonController.update_user_common_lesson)
router.delete("/delete_user_common_lesson/:userCommonLessonId",userCommonLessonController.delete_user_common_lesson)
router.get("/get_all_user_common_lesson/:moduleId/:userId",userCommonLessonController.get_all_user_common_lesson)
router.get("/get_user_common_lesson/:commonLessonId/:userId",userCommonLessonController.get_user_common_lesson)
router.get("/get_count_common_lesson_did/:userId",userCommonLessonController.get_count_common_lesson_did)
module.exports.router = router