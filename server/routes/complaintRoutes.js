const complaintController = require("../controllers/complaintController.js")
const express = require("express")
const router = express.Router();

router.post("/complaints",complaintController.complaints)

exports.router = router