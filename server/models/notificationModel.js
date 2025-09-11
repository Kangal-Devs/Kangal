const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    isLesson:{
        type:Boolean,
        required:[true,"notificationError1"]
    }
    ,
    text:{
        type:String,
        required:[true,"notificationError2"]
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:[true,"notificationError3"]
    }
},
{
    timestamps:true
})

const notificationModel = mongoose.model("Notification",notificationSchema)

module.exports.notificationModel = notificationModel