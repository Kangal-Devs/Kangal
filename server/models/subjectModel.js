const mongoose = require("mongoose")

const subjectSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"subjectError1"]
    },
    image:{
        type:Buffer,
        required:[true,"subjectError2"]
    }
})

const subjectModel = mongoose.model("Subject",subjectSchema)

module.exports.subjectModel = subjectModel