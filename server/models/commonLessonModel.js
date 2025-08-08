const mongoose = require("mongoose")


const commonLessonSchema = mongoose.Schema({
    module:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"commonLessonError1"],
        ref:"Module"
    },
    name:{
        type:String,
        required:[true,"commonLessonError2"]
    },
    introduction:{
        type:String,
        required:[true,"commonLessonError3"]
    },
    color:{
        type:String,
        required:[true,"commonLessonError4"],
        enum:["#BEFF55","#36AFE4","#FFF600","#AD51EA" ,"#30C4DE","#FFFFFF"]
    },
    image:{
        type:Buffer,
        required:[true,"commonLessonError5"]
    },
    points:{
        type:Number,
        required:[true,"commonLessonError6"],
       
    },
}
,)

const commonLessonModel = mongoose.model("CommonLesson",commonLessonSchema)

module.exports.commonLessonModel = commonLessonModel