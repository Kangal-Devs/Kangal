const mongoose = require("mongoose")

const commonTaskSchema = mongoose.Schema({
    commonLesson:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"commonTaskError1"],
        ref:"CommonLesson"
    },
    type:{
        type:String,
        required:[true,"commonTaskError2"]
    },
    text1:{
        type:String,
        required:[true,"commonTaskError3"]
    },
    
     text2:{
        type:String
    },
    possibleAnswer:{
        type:[String]
    },
    correctAnswer:{
        type:[String]
    },
     code:{
        type:String
    },
 
    
})

const commonTaskModel = mongoose.model("CommonTask",commonTaskSchema)

module.exports = commonTaskModel