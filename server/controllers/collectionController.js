const {collectionModel} = require("../models/collectionModel.js")

module.exports.get_all_collections = async(req,res)=>{
    try{
        const {userId} = req.body

        const collections = await collectionModel.find({user:userId})

        res.status(200).json({message:collections})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.create_collection = async(req,res)=>{
    try{
        const {userId,documentId,message} = req.body

        const collection = await collectionModel.create({user:userId,document:documentId,message:message})

        res.status(200).json({message:"created"})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.delete_collection = async(req,res)=>{
    try{
        const {collectionId} = req.body

        const collection = await collectionModel.findByIdAndDelete({_id:collectionId})
        

        res.status(200).json({message:"deleted"})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}