const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")



const complaintSchema = mongoose.Schema({
    userName:{
        type:String,
      
        required:false,
        validate:{
                validator:(value)=>{
                    const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                    return !val;
                },
                message:"errorType1"
                
        }
    },
    name:{
        type:String,
      
        required:false,
        validate:{
                validator:(value)=>{
                    const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                    return !val;
                },
                message:"errorType2"
        }
    },
    email:{
        type:String,
        maxlength:[40,"errorType3"],
        minLength:[7,"errorType4"],
        required:[true,"errorType5"],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,"errorType6"],
        validate:{
            validator:(value)=>{
                const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                return !val;
            },
            message:"errorType7"
    }
    },

    category:{
        type:String,
        enum:["Anúncio",
    "Assinatura",
    "Conta hackeada",
    "Relatório de erros",
    "Sugestões",
    "Suporte técnico",
    "Direitos autorais"],
        required:true
        
    },
    description:{
        type:String,
        maxlength:[500,"errorType8"],
        minlength:[10,"errorType9"],
        required:[true,"errorType10"],
        validate:{
            validator:(value)=>{
                const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                return !val;
            },
            message:"errorType11"
    }
    }
})

const complaintModel = mongoose.model("Complaint",complaintSchema)

module.exports.complaintModel = complaintModel;