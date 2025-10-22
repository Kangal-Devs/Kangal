const express = require("express")
const router = express.Router()
const notificationController = require("../controllers/notificationController.js")

router.get("/get_notification/:notification_id",notificationController.get_notification)

module.exports.router = router