const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    groupLesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupLesson",
        required: [true,"answersError1"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,"answersError2"]
    }
}, { timestamps: true })

const answerModel = mongoose.model("Answer", answerSchema)

module.exports.answerModel = answerModel