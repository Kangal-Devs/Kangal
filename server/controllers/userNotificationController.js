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
// Rota para ler todas as notificações não lidas
module.exports.read_notifications = async(req,res)=>{
    try{
        const {user_id:userId} = req.params
        
        const userNotification = await userNotificationModel.updateMany({user:userId},{$set:{isRead:true}})
        
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

            userNotifications.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt));

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