const mongoose = require("mongoose")

const moduleSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"moduleError1"]
    },
    image:{
        type:Buffer,
        required:[true,"moduleError2"]
    }
})

const moduleModel = mongoose.model("Module",moduleSchema)

module.exports.moduleModel = moduleModel