const express = require("express")
const router = express.Router()
const messageReportController = require("../controllers/messageReportController.js")
router.post("/create_message_report",messageReportController.create_message_report)

module.exports.router = router