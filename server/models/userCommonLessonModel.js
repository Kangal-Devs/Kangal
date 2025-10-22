const mongoose = require("mongoose")

const userCommonLessonSchema = mongoose.Schema({
    status:{
        type:String,
        enum:["toDo","did"],
        required:[true,"userCommonLessonError1"]
    },
    points:{
        type:Number,
        // required:[true,"userCommonLessonError2"]
    },
    commonLesson:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"userCommonLessonError2"],
        ref:"CommonLesson"

    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"userCommonLessonError3"],
        ref:"User"

    }
},{
    timestamps:true
})

const userCommonLessonModel = mongoose.model("UserCommonLesson",userCommonLessonSchema)

module.exports.userCommonLessonModel = userCommonLessonModel