const mongoose = require("mongoose")

const userGroupLessonSchema = mongoose.Schema({
    groupLesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupLesson",
        required:[true,"userGroupLessonError1"]
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userGroupLessonError2"]  
    },
    score:{
        type:Number,
        required:false
    },
    message:{
        type:String,
        required:false
    }
    
},{timestamps:true})

const userGroupLessonModel = mongoose.model("UserGroupLesson",userGroupLessonSchema)

module.exports.userGroupLessonModel = userGroupLessonModel