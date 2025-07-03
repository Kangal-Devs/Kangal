const mongoose = require("mongoose")


const commonLessonSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"commonLessonError1"]
    },
    introduction:{
        type:String,
        required:[true,"commonLessonError2"]
    },
    color:{
        type:String,
        required:[true,"commonLessonError3"]
    },
    image:{
        type:Buffer,
        required:[true,"commonLessonError4"]
    }
}
,)

const commonLessonModel = mongoose.model("CommonLesson",commonLessonSchema)

module.exports.commonLessonModel = commonLessonModel