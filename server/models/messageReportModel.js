const mongoose = require("mongoose")

const reportSchema = mongoose.Schema({
    reporter:{
         type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:[true,"messageReportError1"]
    },
    message:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        required:[true,"messageReportError2"]
    },
    reason:{
        type:String,
        required:[true,"messageReportError3"],
        minLength:[1,"reportError4"],
        maxLength:[300,"reportError5"]
    }
})

const messageReportModel = mongoose.model("MessageReport",reportSchema)

module.exports.messageReportModel = messageReportModel