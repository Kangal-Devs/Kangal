const mongoose = require("mongoose")

const documentSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"documentError1"]
    },
    description1:{
        type:String,
        required:[true,"documentError2"]
    },
    code1:{
        type:String,
        required:[true,"documentError3"]
    },
    code2:{
        type:String,
        required:false
    },
    description2:{
        type:String,
        required:[true,"documentError4"]
    },
    note:{
        type:String,
        required:false
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"documentError5"]
    }
})

const documentModel = mongoose.model("Document",documentSchema)

module.exports.documentModel = documentModel