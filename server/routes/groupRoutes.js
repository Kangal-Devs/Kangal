const express = require("express")
const router = express.Router();
const groupController = require("../controllers/groupController.js")
const {upload} = require("../middleware/upload.js")

router.post('/create_group',groupController.create_group)
router.post('/get_group',groupController.get_group)
router.post('/get_count_owner_group',groupController.get_count_owner_group)
router.put('/update_group/:groupId',upload.single("file"),groupController.update_group)
router.get('/get_all_groups',groupController.get_all_groups)
router.get('/get_all_public_groups',groupController.get_all_public_groups)

module.exports.router = router