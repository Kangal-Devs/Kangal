const solicitationController = require("../controllers/solicitationController.js")
const express = require("express")
const router = express.Router();
router.post('/my_solicitation',solicitationController.get_solicitation)
router.delete('/delete_solicitation/:userId/:groupId',solicitationController.delete_solicitation)
router.post('/create_solicitation',solicitationController.create_solicitation)

module.exports.router = router