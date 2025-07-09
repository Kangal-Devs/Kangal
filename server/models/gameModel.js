const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"gameError1"],
    },
    icon:{
        type:Buffer,
        required:[true,"gameError2"]
    },
    thumbnail:{
        type:Buffer,
        required:[true,"gameError3"]
    },
    subject:{
        type:String,
        required:[true,"gameError4"]
    },
    description:{
        type:String,
        required:[true,"gameError5"]
    },
    link:{
        type:String,
        required:[true,"gameError6"]
    }
})

const gameModel = mongoose.model("Game",gameSchema)

module.exports.gameModel = gameModel