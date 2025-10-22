const {messageModel} = require("../models/messageModel.js")
const messageService = require("../services/messageService.js")
module.exports.create_message = async(req,res)=>{
    // try{
    //     const {groupId,value,backgroundColor,fontColor} = req.body
    //     const status = "A"
    //     const message = await messageModel.create({group:groupId,value,backgroundColor,fontColor,status})

    //     res.status(200).json({message:"criado"})
    // }
    // catch(err){
    //     res.status(500).json({message:err.message})
    // }   
    try{
        const message = await messageService.create_message(req.body)
        res.status(200).json({message:"criado"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}
module.exports.get_all_message = async (req,res)=>{
    try{
        const {groupId} = req.body

        const messages = await messageModel.find({group:groupId})
        res.status(200).json({message:messages})
    }
   catch(err){
        res.status(500).json({message:err.message})
    } 
}

module.exports.delete_message = async (req,res)=>{
    try{
        const {message_id:messageId} = req.params

        const message = await messageModel.findByIdAndUpdate(messageId,{status:"D"})
        res.status(200).json({message:"mensagem deletada"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    } 
}
module.exports.update_message = async (req,res)=>{
    try{
        const {message_id:messageId} = req.params
        const {value} = req.body

        const message = await messageModel.findByIdAndUpdate(messageId,{status:"E",value},{runValidators:true})
        res.status(200).json({message:"mensagem atualizada"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    } 
}