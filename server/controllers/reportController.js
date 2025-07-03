const {reportModel} = require("../models/reportModel.js")
const {userModel} = require("../models/userModel.js")

exports.create_report = async(req,res)=>{
    const {reporter,reported,reason} = req.body

    const user = await userModel.findOne({_id:reporter})
    const user1 = await userModel.findOne({_id:reported})

    if(user && user1){
        const report = await reportModel.create({reporter,reported,reason})
        res.status(200).json({message:"created"})
    }
    res.status(404).json({message:"user not found"})
} 
