const {solicitationModel} = require("../models/solicitationModel.js")
const {userGroupModel} = require("../models/userGroupModel.js")
const {userModel} = require("../models/userModel.js")
const {groupModel} = require("../models/groupModel.js")

//PEGA SOLICITAÇÕES DE UMA PESSOA
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
//PEGA SOLICITAÇÕES DE UM GRUPO
exports.get_solicitation2 = async (req,res)=>{
    try{
        const {_id} = req.body
        const group = await groupModel.findOne({_id:_id})

        if(group){

       
        const groupSolicitation = await solicitationModel.find({group:_id})
   
            

        return res.status(200).json({message:groupSolicitation})
         }
         res.status(404).json({message:'not found user'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}
exports.delete_solicitation = async (req,res)=>{
    try{
            const {userId,groupId} = req.params
           const user = await userModel.findOne({_id:userId})
           const group = await groupModel.findOne({_id:groupId})

           if(group && user){
                const solicitation = await solicitationModel.findOneAndDelete({user:userId,group:groupId})
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


        const group = await groupModel.findOne({_id:groupId})
        const user = await userModel.findOne({_id:userId})
     
   
            
         
         if(user && group){
         const userGroup = await userGroupModel.findOne({user:userId,group:groupId})
        //Caso o usuário já estiver no grupo, a solicitação não sera criada
        if(!userGroup){
            const solicitation = await solicitationModel.findOne({user:userId,group:groupId})

             //Caso o usuário já houver um solicitação para esse mesmo grupo,a solicitação não sera criada
            if(!solicitation){
                const solicitation2 = await solicitationModel.create({user:userId,group:groupId})
                return res.status(200).json({message:"solicitation created!!"}) 
            }
           return res.status(400).json({message:"user already has solicitation"}) 
        }
        return res.status(400).json({message:"user is already in the group"}) 
        }
        console.log(user?.name)
        console.log(group?.name)
        res.status(404).json({message:" 1not found group or user"})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}