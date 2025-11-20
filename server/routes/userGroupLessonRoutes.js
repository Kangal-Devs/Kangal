const express = require("express")
const router = express.Router()
const userGroupLessonController = require("../controllers/userGroupLessonController.js")
router.post("/create_user_group_lesson",userGroupLessonController.create_user_group_lesson)
router.get("/get_user_group_lesson/:group_lesson_id/:user_id",userGroupLessonController.get_user_group_lesson)
router.get("/get_all_user_group_lesson/:group_lesson_id",userGroupLessonController.get_all_user_group_lesson)
router.put("/update_user_group_lesson/:group_lesson_id/:user_id",userGroupLessonController.update_user_group_lesson)
module.exports.router = router