const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")

const groupLessonSchema = mongoose.Schema({
    group:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"groupLessonError1"],
        ref:"Group"
    },
    name:{
        type:String,
        required:[true,"groupLessonError2"],
        minLength:[1,"groupLessonError3"],
        maxLength:[35,"groupLessonError4"],
        validate:{
            validator:(value)=>{
                const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                return !val;
            },
            message:"groupLessonError5"
        }
    },
    status:{
        type:String,
        enum:["A","B","D"], // A = Ativa, B = Bloqueada, D = Deletada
        required:[true,"groupLessonError6"]
    },
    image:{
        type:Buffer,
        required:[true,"groupLessonError7"]
    },
    description:{
        type:String,
        required:[true,"groupLessonError8"]
    }
},{
    timestamps:true
})

const groupLessonModel = mongoose.model("GroupLesson",groupLessonSchema)

module.exports.groupLessonModel = groupLessonModel