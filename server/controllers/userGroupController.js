const {userGroupModel} = require("../models/userGroupModel.js")
const {solicitationModel} = require("../models/solicitationModel.js")
const {userModel} = require("../models/userModel.js")

const {groupModel} = require("../models/groupModel.js")
const {messageModel} = require("../models/messageModel.js")
// const {solicitationModel} = require("../models/solicitationModel.js")
exports.get_user_group = async (req,res)=>{
    try{
        const {groupId,userId} = req.body

        const user = await userModel.findOne({_id:userId})
        const group = await groupModel.findOne({_id:groupId})

        if(user && group){
            const userGroup = await userGroupModel.findOne({user:userId,group:groupId})
            if(userGroup){
                res.status(200).json({message:"found"})
            }
            return res.status(404).json({message:"not found userGroup"})
        }
        res.status(404).json({message:"not found group or user"})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
// Essa rota retorna todos os grupos que o usuário participa
exports.get_all_user_group = async (req,res)=>{
    try{
    const {_id} = req.body;

    const user = await userModel.findOne({_id:_id})

    if(user){
        const userGroup = await userGroupModel.find({user:_id})
        return res.status(200).json({message:userGroup})
    }   
    res.status(404).json({message:"not found user"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// Essa rota retorna todas os usuários que o participam do grupo
exports.get_all_user_group2 = async (req,res)=>{
    try{
    const {_id} = req.body;
    const group = await groupModel.findOne({_id:_id})
    if(group){
     
        const userGroup = await userGroupModel.find({group:_id})
        return res.status(200).json({message:userGroup})
    }   
    res.status(404).json({message:"not found group"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.delete_user_group = async (req,res)=>{
    try{
         const {userId,groupId} = req.params

        const user = await userModel.findOne({_id:userId})
        const group = await groupModel.findOne({_id:groupId})

        if(user && group){

            if(group.owner == userId){
            
            const solictation = await solicitationModel.deleteMany({group:groupId})
            const message = await messageModel.deleteMany({group:groupId})
            const userGroup = await userGroupModel.deleteMany({group:groupId})
            const group = await groupModel.findOneAndDelete({_id:groupId})
            return res.status(200).json({message:"dono?!"})
            }
            else{
                const userGroup = await userGroupModel.findOneAndDelete({user:userId,group:groupId})
            return res.status(200).json({message:"deleted!!"})
            }
            
        }
        res.status(404).json({message:"not found group or user"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.create_user_group = async (req,res)=>{
    try{
        const {userId,groupId} = req.body

        const user = await userModel.findOne({_id:userId})
        const group = await groupModel.findOne({_id:groupId})

        if(user && group){
            const solicitation = await solicitationModel.findOne({user:userId,group:groupId})
            if(solicitation){
                    await solicitation.deleteOne()
                    const userGroup = await userGroupModel.create({user:userId,group:groupId})
                    return res.status(200).json({message:"created!"})
            }
            return res.status(400).json({message:"you must have a solicitation to join in"})
        }
        res.status(404).json({message:"not found group or user"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_count_user_group = async (req,res) =>{
    try{const {userId} = req.body;

    const countGroup = await userGroupModel.countDocuments({user:userId})
    res.status(200).json({message:countGroup})}
     catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_count_members_group = async(req,res)=>{
    try{
    const {groupId} = req.params

    const countMembersGroup = await userGroupModel.countDocuments({group:groupId})
    res.status(200).json({message:countMembersGroup})}
    catch(err){
        res.status(500).json({message:err.message})
    }
}