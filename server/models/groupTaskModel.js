const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")

const groupTaskSchema = mongoose.Schema({
    groupLesson:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"groupTaskError1"],
        ref:"GroupLesson"
    },
    category:{
        type:String,
        enum:["select","toCorrect","free","explanation","toContinue"],
        required:[true,"groupTaskError2"]
    },
    text:{
        type:String,
        minLength:[1,"groupTaskError3"],
        maxLength:[300,"groupTaskError4"],
        required:[true,"groupTaskError5"]
    },
    text2:{
        type:String,
        minLength:[1,"groupTaskError6"],
        maxLength:[100,"groupTaskError7"],
        required:false
    },
    correct:{
        type:String,
        required:false,
         maxLength:[1,"groupTaskError8"],
        maxLength:[30,"groupTaskError9"]
    },
    possibleAnswers:{
        type:String,
        required:false,
        maxLength:[1,"groupTaskError-10"],
        maxLength:[30,"groupTaskError-11"]
    }
})

const groupTaskModel = mongoose.model("GroupTask",groupTaskSchema)

module.exports.groupTaskModel = groupTaskModel

