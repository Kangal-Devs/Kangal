
// const {notificationModel} = require("../models/notificationModel.js")
// const {userNotificationModel} = require("../models/userNotificationModel.js")
// const {userModel} = require("../models/userModel.js")
// const {groupModel} = require("../models/groupModel.js")
// const {solicitationModel} = require("../models/solicitationModel.js")
// const 



// const {userId,groupId} = req.params

//         const user = await userModel.findOne({_id:userId})
//         const group = await groupModel.findOne({_id:groupId})

//         if(user && group){

//             if(group.owner == userId){
            
//                 const notifications = await notificationModel.find({group:groupId})
//             //Deletando todas as relações com o grupo
//             // notifications.forEach(async(notification)=>{
//             //     await userNotificationModel.deleteMany({notification:notification._id})
//             // })
//             if(notifications.length){
//             const res = await Promise.all(notifications.map(async(notification)=>{
//                 return await userNotificationModel.deleteMany({notification:notification._id})
//             }))
            
//             const notificationsToDelete = await notificationModel.deleteMany({group:groupId})
//             }
//             const solictations = await solicitationModel.deleteMany({group:groupId})
//             const messages = await messageModel.deleteMany({group:groupId})
//             const userGroups = await userGroupModel.deleteMany({group:groupId})


//             const group = await groupModel.findOneAndDelete({_id:groupId})
//             return res.status(200).json({message:"dono?!"})
//             }
//             else{
//                 const userGroup = await userGroupModel.findOneAndDelete({user:userId,group:groupId})
//             return res.status(200).json({message:"deleted!!"})
//             }
            
//         }
//         res.status(404).json({message:"not found group or user"})