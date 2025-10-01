const {messageReportModel} = require("../models/messageReportModel.js")
const { userModel } = require("../models/userModel.js")
const { messageModel } = require("../models/messageModel.js")

exports.create_message_report= async(req,res)=>{
    try{
        const {userId,messageId,reason} = req.body

        const user = await userModel.findOne({_id:userId})
        const message = await messageModel.findOne({_id:messageId})

        if(message && user){
            const messageReport = await messageReportModel.create({reporter:userId,message:messageId,reason})
            return res.status(200).json({message:"message report criada"})
        }
        res.status(404).json({message:"user or message not found"})
    }
    catch(err){
            res.status(200).json({message:err.message})
    }
}