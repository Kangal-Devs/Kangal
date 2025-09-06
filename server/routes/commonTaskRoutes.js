const express = require("express")
const router = express.Router()
const commonTaskController = require("../controllers/commonTaskController.js")

router.post("/create_common_task",commonTaskController.create_common_task)
router.get("/get_common_task/:common_task_id",commonTaskController.get_common_task)
router.get("/get_all_common_task/:common_lesson_id",commonTaskController.get_all_common_task)

module.exports.router = router