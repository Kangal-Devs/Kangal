const {userNotificationModel} = require("../models/notificationModel.js")

module.exports.create_user_notification = async(req,res)=>{
    try{
        const {notificationId,userId} = req.body

        const userNotification = await userNotificationModel.create({user:userId,notification:notificationId,isRead:false})

        res.status(200).json({message:"create usernotification"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}