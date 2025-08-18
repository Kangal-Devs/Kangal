const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"collectionError1"],
        ref:"User"
    }
    ,
    document:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"collectionError2"],
        ref:"Document"
    },
    message:{
        type:String,
        required:[true,"collectionError3"]
    }
},
{
    timestamps:true
})

const collectionModel = mongoose.model("Collection",collectionSchema)

module.exports.collectionModel = collectionModel