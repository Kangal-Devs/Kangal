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
    image1:{
        type:Buffer,
        required:[true,"documentError3"]
    },
    code1:{
        type:String,
        required:[true,"documentError4"]
    },
    image2:{
        type:Buffer,
        required:[true,"documentError5"]
    },
    code2:{
        type:String,
        required:[true,"documentError6"]
    },
    description2:{
        type:String,
        required:[true,"documentError7"]
    },
    note:{
        type:String,
        required:[true,"documentError8"]
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"documentError9"]
    }
})

const documentModel = mongoose.model("Document",documentSchema)

module.exports.documentModel = documentModel