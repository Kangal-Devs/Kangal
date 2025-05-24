const mongoose = require("mongoose")

const planSchema = mongoose.Schema({
    name:{
        type:String
    },
    groupMax:{
        type:Number
    },
    insignia:{
        type:Buffer
    }
    
},{
    timestamps:true
})

const planModel = mongoose.model('Plan',planSchema);

exports.planModel = planModel