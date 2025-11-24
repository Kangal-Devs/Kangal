const {userGroupTaskModel} = require("../models/userGroupTaskModel.js")

module.exports.create_user_group_task = async(req,res)=>{
    try{
        const{userId,groupTaskId,response} = req.body
        
         await userGroupTaskModel.deleteOne({user:userId,groupTask:groupTaskId})
         await userGroupTaskModel.create({user:userId,groupTask:groupTaskId,response})
         res.status(200).json({message:"created group task"})
        
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_user_group_task = async(req,res)=>{
    try{
        const {user_id:userId,group_task_id:groupTaskId}= req.params
        const userGroupTask = await userGroupTaskModel.findOne({user:userId,groupTask:groupTaskId})
        res.status(200).json({message:userGroupTask})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}