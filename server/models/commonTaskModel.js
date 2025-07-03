const mongoose = require("mongoose")

const commonTaskSchema = mongoose.Schema({
    commonLesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupLesson",
        required:[true,"commonTaskError1"]
    },
    //TO CONTINUE V
})