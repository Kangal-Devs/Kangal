const {solicitationModel} = require("../models/solicitationModel.js")
const {userModel} = require("../models/userModel.js")
const {groupModel} = require("../models/groupModel.js")

exports.get_solicitation = async (req,res)=>{
    try{
        const {_id} = req.body
        const user = await userModel.findOne({_id:_id})

        if(user){

       
        const mySolicitation = await solicitationModel.find({user:_id})

        return res.status(200).json({message:mySolicitation})
         }
         res.status(404).json({message:'not found user'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}

exports.delete_solicitation = async (req,res)=>{
    try{
            const {userId,groupId} = req.body
           const user = await userModel.findOne({_id:userId})
           const group = await userModel.findOne({_id:groupId})

           if(group && user){
                const solicitation = solicitationModel.findOneAndDelete({user:userId,group:groupId})
                 return res.status(200).json({message:'solicitation deleted'})
           }
           res.status(400).json({message:'not found'})
    }
    catch(err){
          res.status(500).json({message:err.message})
    }
}

exports.create_solicitation = async (req,res)=>{
    try{
         const {userId,groupId} = req.body
           const user = await userModel.findOne({_id:userId})
           const group = await userModel.findOne({_id:groupId})

           if(group && user){

            const solicitation = solicitationModel.create({user:userId,group:groupId})

            return res.status(200).json({message:'solicitation created'})
              }
              res.status(400).json({message:'not found'})
    }catch(err){
                res.status(500).json({message:err.message})
    }
}