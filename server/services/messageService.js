const {messageModel} = require("../models/messageModel.js")
const {notificationModel} = require("../models/notificationModel.js")
const {userNotificationModel} = require("../models/userNotificationModel.js")
const {groupModel} = require("../models/groupModel.js")
const {userGroupModel} = require("../models/userGroupModel.js")

module.exports.create_message = async(data)=>{
    const {groupId,value,backgroundColor,fontColor} = data
    const status = "A"

    const group = await groupModel.findOne({_id:groupId})

    if(!group){
         throw new Error("group not found")
    }
    const message = await messageModel.create({status,group:groupId,value,backgroundColor,fontColor})
    
    const notification = await notificationModel.create({group:groupId,text:value,isLesson:false})

    const usersGroup = await userGroupModel.find({group:groupId})

    console.log(group.owner)
    console.log(usersGroup[0].user)
    await Promise.all(usersGroup.map(async (userGroup)=>{
        
        
        if(!group.owner.equals(userGroup.user)){
            return await userNotificationModel.create({user:userGroup.user,notification:notification._id,isRead:false})    
        }

    }))

    

    // return res.status(200).json({message:"created"})

}