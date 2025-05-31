const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")

const groupSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"groupErrorType1"],
        minLength:[3,"groupErrorType2"],
        maxLength:[25,"groupErrorType3"],

        validate:{
                validator:(value)=>{
                    const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                    return !val;
                },
                message:"groupErrorType4"
        }
    },
     image:{
        type:Buffer,
        required:[true,"groupErrorType5"]
    },
    description:{
        type:String,
        required:false,
        maxLength:[250,"groupErrorType6"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"groupErrorType7"]
    }


},{
    timestamps:true
})

const groupModel = mongoose.model("Group",groupSchema)

exports.groupModel = groupModel