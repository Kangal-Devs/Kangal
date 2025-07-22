const subjectController = require("../controllers/subjectController.js")
const express = require("express")
const router = express.Router()

router.post("/create_subject",subjectController.create_subject)
router.post("/get_subject",subjectController.get_subject)
router.get("/get_all_subjects",subjectController.get_all_subjects)

module.exports.router = router