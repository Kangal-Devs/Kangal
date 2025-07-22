const express = require("express")
const router = express.Router()
const documentController = require("../controllers/documentController.js")
const upload = require("../middleware/upload.js").upload

router.post("/create_document",upload.none(),documentController.create_document)
router.post("/get_all_documents",documentController.get_all_documents)
router.post("/get_document",documentController.get_document)
module.exports.router = router