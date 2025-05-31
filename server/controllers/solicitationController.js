const {solicitationModel} = require("../models/solicitationModel.js")
const {userGroupModel} = require("../models/userGroupModel.js")
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
    // try{
    //      const {userId,groupId} = req.body
    //        const user = await userModel.findOne({_id:userId})
    //        const group = await groupModel.findOne({_id:groupId})

    //        if(group && user){

    //         const solicitation = await solicitationModel.create({user:userId,group:groupId})

    //         return res.status(200).json({message:'solicitation created'})
    //           }
    //           res.status(400).json({message:'not found'})
    // }catch(err){
    //             res.status(500).json({message:err.message})
    // }

    try{
        const {userId,groupId,groupName} = req.body
        let group
        if(groupId){
        group = await groupModel.findOne({_id:groupId})
        }
        else{
        group = await groupModel.findOne({name:groupName})
        }
        const user = await userModel.findOne({_id:userId})
     
        console.log(group.name)
          console.log(group.description)

         
         if(user && group){
                    const userGroup = await userGroupModel.findOne({user:userId,group:group._id})
            //Caso o usuário já estiver no grupo, a solicitação não sera criada
        if(!userGroup){
            const solicitation = await solicitationModel.findOne({user:userId,group:group._id})

             //Caso o usuário já houver um solicitação para esse mesmo grupo,a solicitação não sera criada
            if(!solicitation){
                const solicitation = await solicitationModel.create({user:userId,group:group._id})
                return res.status(200).json({message:"solicitation created!!"}) 
            }
           return res.status(400).json({message:"user already has solicitation"}) 
        }
        return res.status(400).json({message:"user is already in the group"}) 
        }
        res.status(404).json({message:" not found group or user"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}