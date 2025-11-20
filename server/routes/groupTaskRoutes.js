const groupLessonController = require("../controllers/groupTaskController.js")
const express = require("express")
const router = express.Router()
const {upload} = require("../middleware/upload.js")
router.post("/create_group_task",upload.single("file"),groupLessonController.create_group_task)
router.get("/get_all_incomplete_group_task/:group_id",groupLessonController.get_all_incomplete_group_task)
router.get("/get_all_group_lesson_tasks/:group_lesson_id",groupLessonController.get_all_group_lesson_tasks)
router.delete("/delete_group_task/:group_task_id",groupLessonController.delete_group_task)
module.exports.router = router