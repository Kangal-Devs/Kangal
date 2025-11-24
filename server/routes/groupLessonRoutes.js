const groupLessonController = require("../controllers/groupLessonController.js")
const express = require("express")
const router = express.Router()
const {upload} = require("../middleware/upload.js")
router.post("/create_group_lesson",upload.single("file"),groupLessonController.create_group_lesson)
router.get("/get_all_group_lesson/:group_id",groupLessonController.get_all_group_lesson)
router.get("/get_group_lesson/:group_lesson_id",groupLessonController.get_group_lesson)
router.put("/update_group_lesson/:group_lesson_id",upload.single("file"),groupLessonController.update_group_lesson)
module.exports.router = router
