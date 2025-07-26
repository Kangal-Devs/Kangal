const moduleController = require("../controllers/moduleController.js")
const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload.js").upload

router.post("/create_module",moduleController.create_module)
router.post("/get_all_modules",moduleController.get_all_modules)

module.exports.router = router