const router = require("express").Router()
const userGroupTaskController = require("../controllers/userGroupTaskController.js")

router.post("/create_user_group_task",userGroupTaskController.create_user_group_task)
router.get("/get_user_group_task/:user_id/:group_task_id",userGroupTaskController.get_user_group_task)

module.exports.router = router