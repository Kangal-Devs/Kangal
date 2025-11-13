const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")

const groupTaskSchema = mongoose.Schema({
    groupLesson:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"groupTaskError1"],
        ref:"GroupLesson"
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"Group"
    },
    category:{
        type:String,
        enum:["select","free","explanation"],
        required:[true,"groupTaskError2"]
    },
    title:{
        type:String,
        required:[true,"groupTaskError3"]
    },
    description1:{
        type:String,
        required:[true,"groupTaskError4"]
    },
    description2:{
        type:String,
        required:false
    },
    code:{
        type:String,
        required:false
    },
    image:{
        type:Buffer,
        required:false
    },
    possibleAnswers:{
        type:[String],
        required:false
    }
})

const groupTaskModel = mongoose.model("GroupTask",groupTaskSchema)

module.exports.groupTaskModel = groupTaskModel

