const {userNotificationModel} = require("../models/userNotificationModel.js")

// O código abaixo comentado, foi transferido para o serviceMessage,
// quando a mensagem é criada também é criada um UserNotification,
// sem necessitar de uma rota específica para isso.


// module.exports.create_user_notification = async(req,res)=>{
//     try{
//         const {notificationId,userId} = req.body

//         const userNotification = await userNotificationModel.create({user:userId,notification:notificationId,isRead:false})

//         res.status(200).json({message:"create usernotification"})
//     }
//     catch(err){
//         res.status(500).json({message:err.message})
//     }
// }

module.exports.read_notification = async(req,res)=>{
    try{
        const {userNotificationId:user_notification_id} = req.body

        const userNotification = await userNotificationModel.findByIdAndUpdate(user_notification_id,{isRead:true})

        res.status(200).json({message:"updated"})
    }
    catch(err){
         res.status(500).json({message:err.message})
    }
}

module.exports.get_all_notifications = async(req,res)=>{
    try{
          const {user_id:userId} = req.params;
          const userNotifications = await userNotificationModel.find({user:userId})
          res.status(200).json({message:userNotifications})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.get_count_user_notification = async (req,res) =>{
    try{
        const {user_id:userId} = req.params;
    const countNotification = await userNotificationModel.countDocuments({user:userId,isRead:false})
    res.status(200).json({message:countNotification})}
     catch(err){
        res.status(500).json({message:err.message})
    }
}