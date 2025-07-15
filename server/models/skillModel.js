const mongoose = require("mongoose")

const skillSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"skillError1"]
    },
     subject:{
        type:String,
        required:[true,"skillError2"]
    },
    description:{
        type:String,
        required:[true,"skillError3"]
    },
    code:{
        type:String,
        required:[true,"skillError4"]
    },
    descriptionExample:{
        type:String,
        required:[true,"skillError5"]
    },
    codeExample:{
        type:String,
        required:[true,"skillError6"]
    },
    game:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"skillError7"]
    },
})

const skillModel = mongoose.model("Skill",skillSchema)

module.exports.skillModel = skillModel