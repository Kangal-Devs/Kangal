const express = require("express")
const router = express.Router();

const userNotificationController = require("../controllers/userNotificationController.js")

router.get("/get_all_user_notifications/:user_id",userNotificationController.get_all_notifications)
router.get("/get_count_user_notification/:user_id",userNotificationController.get_count_user_notification)
router.put("/read_notifications/:user_id",userNotificationController.read_notifications)

module.exports.router = router