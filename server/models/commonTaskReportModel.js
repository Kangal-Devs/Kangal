const mongoose = require("mongoose")

const commonTaskReportSchema = mongoose.Schema({
    commonTask:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"commonTaskReportError1"],
        ref:'CommonTask'
    }
    ,
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"commonTaskReportError2"],
        ref:'User'
    },
    reason:{
        type:String,
        required:[true,"commonTaskReportError3"]
    }
},{
    timestamps:true
})

const commonTaskReportModel = mongoose.model("commonTaskReport",commonTaskReportSchema)

module.exports.commonTaskReportModel = commonTaskReportModel