const mongoose = require("mongoose")

const userNotificationSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userNotificationError1"]
    },
    notification:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification",
        required:[true,"userNotificationError2"]
    },
     isRead:{
        type:Boolean,
        required:[true,"userNotificationError3"]
    }
},
{
    timestamps:true
})

const userNotificationModel = mongoose.model("UserNotification",userNotificationSchema)

module.exports.userNotificationModel = userNotificationModel