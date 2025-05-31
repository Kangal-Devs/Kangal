const mongoose = require("mongoose")

const myPlanSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Plan'
    }
},
{
    timestamps:true
})

const myPlanModel = mongoose.model('MyPlan',myPlanSchema)

exports.myPlanModel = myPlanModel