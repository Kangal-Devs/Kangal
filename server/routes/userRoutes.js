const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController.js")
const upload = require("../middleware/upload.js").upload

router.post("/signup",userController.signup)
router.post("/signin",userController.signin)
router.post("/email_verification",userController.email_verification)
router.post("/clear_cookie",userController.clear_cookie)
router.post("/authorization",userController.authorization)
router.put("/user_update/:_id",upload.single("file"),userController.user_update)

module.exports.router = router