const express = require("express")
const router = express.Router();
const groupController = require("../controllers/groupController.js")

router.post('/create_group',groupController.create_group)
router.post('/get_group',groupController.get_group)
router.post('/get_count_owner_group',groupController.get_count_owner_group)

module.exports.router = router