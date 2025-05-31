const mongoose = require("mongoose");

const userGroupSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"userGroupError1"]
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:[true,"userGroupError2"]
    }
},{
    timestamps:true
})

const userGroupModel = mongoose.model("UserGroup",userGroupSchema);

module.exports.userGroupModel = userGroupModel;