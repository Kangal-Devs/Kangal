const mongoose = require("mongoose");

const solicitationSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"solicitationError1"]
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:[true,"solicitationError2"]
    }
},{
    timestamps:true
})

const solicitationModel = mongoose.model("SolicitationGroup",solicitationSchema);

module.exports.solicitationModel = solicitationModel;