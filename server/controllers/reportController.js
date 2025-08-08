const {reportModel} = require("../models/reportModel.js")
const {userModel} = require("../models/userModel.js")
const {groupModel} = require("../models/groupModel.js")

exports.create_report = async(req,res)=>{
    const {reporter,reported,reason,groupId} = req.body

    const group = await groupModel.findOne({_id:groupId})
    const user = await userModel.findOne({_id:reporter})
    const user1 = await userModel.findOne({_id:reported})

    if(user && user1 && group){
        const report = await reportModel.create({reporter,reported,reason,group:groupId})
        res.status(200).json({message:"created"})
    }
    res.status(404).json({message:"user or group not found"})
} 
