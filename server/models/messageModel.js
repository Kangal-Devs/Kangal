const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")

const messageSchema = mongoose.Schema({

    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:[true,"messageError1"]
    },
    value:{
        type:String,
        required:[true,"messageError2"],
          minLength:[1,"messageError3"],
        maxLength:[500,"messageError4"],
        validate:{
            validator:(value)=>{
                const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                return !val;
            },
            message:"messageError5"
        }
    },
     status:{
        type:String,
        enum:["A","B","D"], // A = Ativa, B = Bloqueada, D = Deletada
        required:[true,"messageError6"]
    }
},
{timestamps:true})

const messageModel = mongoose.model("Message",messageSchema)

module.exports.messageModel = messageModel