const mongoose = require("mongoose")
const {prohibitedWords} = require("../prohibitedWords.js")

const userSchema = mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"errorType1"],
        minLength:[3,"errorType2"],
        maxLength:[15,"errorType3"],
        unique:[true,"errorType4"],
        validate:{
            validator:(value)=>{
                const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                return !val;
            },
            message:"errorType5"
        }
    },
    email:{
        type:String,
        required:[true,"errorType6"],
        minLength:[7,"errorType7"],
        maxLength:[40,"errorType8"],
        unique:[true,"errorType9"],
        validate:{
            validator:(value)=>{
                const val = prohibitedWords.some((prohibitedWord)=> value.toLowerCase().includes(prohibitedWord))
                return !val;
            },
            message:"errorType-10"
        }
    },
    xp:{
        type:Number,
        required:[true,"errorType-11"]
    },
    password:{
        type:String,
        required:[true,"errorType-12"],
        validate: {
            validator: function (value) {
              // Verifica se a senha é forte: pelo menos 8 caracteres, com letra minúscula, maiúscula, número e símbolo
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
            },
            message:
              "errorType-13"
          },
    }
    ,
    accountType:{
        type:String,
        required:[true,"errorType-14"],
        enum:["common","google"]
    }

    ,
    date:{
        type:Date,
        required:[true,"errorType-15"],
       
    },
    image:{
        type:Buffer,
        required:[true,"errorType-19"]
    },
    github:{
        type:String,
        // validate:{
        //     validator:(value)=>{
        //         if(value==null) return true;
        //         if(value.includes("https://github.com/") || value.includes("github.com/") || value.includes("www.github.com/")){
        //             return true
        //         }
        //         else{return false}
        //     },
        //     message:"errorType-20"
        // }
    },
    gender:{
        type:String,
        required:[true,"errorType-21"]
    },
},
{
    timestamps:true
})

const userModel = mongoose.model("User",userSchema)

module.exports.userModel = userModel