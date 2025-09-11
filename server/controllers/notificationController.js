const {notificationModel} = require("../models/notificationModel")

module.exports.create_notification = async(req,res)=>{
    try{
        const {groupId,text,isLesson} = req.body

        const notification = await notificationModel.create({group:groupId,text,isLesson})

        res.status(200).json({message:"create notification"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}