const express = require("express")
const router = express.Router()
const collectionController = require("../controllers/collectionController.js")

router.post("/get_all_collections",collectionController.get_all_collections)
router.post("/delete_collection",collectionController.delete_collection)
router.post("/create_collection",collectionController.create_collection)

module.exports.router = router