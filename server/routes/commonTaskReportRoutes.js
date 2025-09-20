const express = require("express")
const router = express.Router()
const commonTaskReportController = require("../controllers/commonTaskReportController")

router.post("/create_common_task_report",commonTaskReportController.create_common_task_report)

module.exports.router = router