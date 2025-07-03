const reportController = require("../controllers/reportController.js")
const express = require("express")
const router = express.Router()

router.post("/create_report",reportController.create_report)

module.exports.router = router