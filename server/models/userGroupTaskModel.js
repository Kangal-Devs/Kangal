const mongoose = require("mongoose")

const userGroupTaskSchema = mongoose.Schema({
    groupTask:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupTask",
        required:[true,"userGroupTaskError1"]
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userGroupTaskError2"]  
    },
    response:{
        type:String
    }
    
},{timestamps:true})

const userGroupTaskModel = mongoose.model("UserGroupTask",userGroupTaskSchema)

module.exports.userGroupTaskModel = userGroupTaskModel