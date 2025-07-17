const {skillModel} = require("../models/skillModel.js")

module.exports.create_skill = async (req,res)=>{
    // try{
    //     const {title,subject,description,descriptionExample,code,codeExample,gameId} = req.body

    //     const skill = await skillModel.create({title,description,descriptionExample,code,codeExample,game:gameId,subject})

    //     res.status(200).json({message:"skill created"})

    // }
    // catch(err){
    //     res.status(500).json({message:err})

    // }
}

module.exports.get_skills = async(req,res)=>{
    try{
        const {gameId} = req.body
        const skills = await skillModel.find({game:gameId})

        res.status(200).json({message:skills})
    }   
    catch(err){
        res.status(500).json({message:err})
    }
}
module.exports.get_skill = async(req,res)=>{
    try{
        const {skillId} = req.body

        const skill = await skillModel.findOne({_id:skillId})

        res.status(200).json({message:skill})
    }   
    catch(err){
        res.status(500).json({message:err})
    }
}