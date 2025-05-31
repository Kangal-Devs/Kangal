const userGroupController = require("../controllers/userGroupController.js")
const express = require("express")
const router = express.Router();

router.post("/get_user_group",userGroupController.get_user_group)
router.post("/get_all_user_group",userGroupController.get_all_user_group)
router.post("/delete_user_group",userGroupController.delete_user_group)

module.exports.router = router