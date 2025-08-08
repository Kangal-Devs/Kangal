const mongoose = require("mongoose")

const reportSchema = mongoose.Schema({
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"reportError1"]
    },
    reported:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"reportError2"]
    },
    group:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    },
    reason:{
        type:String,
        required:[true,"reportError3"],
        minLength:[1,"reportError4"],
        maxLength:[300,"reportError5"]
    }
}
,{timestamps:true})

const reportModel = mongoose.model("Report",reportSchema)

module.exports.reportModel = reportModel