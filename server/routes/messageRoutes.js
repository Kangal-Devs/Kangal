const express = require("express")
const router = express.Router()
const messageController = require("../controllers/messageController.js")

router.post("/create_message",messageController.create_message)
router.post("/get_all_messages",messageController.get_all_message)
module.exports.router = router