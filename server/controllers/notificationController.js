const {notificationModel} = require("../models/notificationModel")


// O código abaixo foi transferido para messageService

// module.exports.create_notification = async(req,res)=>{
//     try{
//         const {groupId,text,isLesson} = req.body

//         const notification = await notificationModel.create({group:groupId,text,isLesson})

//         res.status(200).json({message:"create notification"})
//     }
//     catch(err){
//         res.status(500).json({message:err.message})
//     }
// }

module.exports.get_notification = async(req,res)=>{
    try{
        const {notification_id:notificationId} = req.params
        
        const notification = await notificationModel.findOne({_id:notificationId})

        res.status(200).json({message:notification})
    }   
    catch(err){
        res.status(500).json({message:err.message})
    }
}