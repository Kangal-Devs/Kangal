const {moduleModel} = require("../models/moduleModel.js")
const path = require("path")
const fs = require("fs")
module.exports.create_module = async (req,res)=>{
    // try{
    //     const imageLocal = path.join(__dirname,"..","assets","JAVA.png")
    //     const image = fs.readFileSync(imageLocal)

    //     const module = await moduleModel.create({name:"Java",image})
    //     res.status(200).json({message:"created"})
    // }
    // catch(err){
    //     res.status(500).json({message:err})
    // }
}

module.exports.get_all_modules = async(req,res)=>{
     try{

        const modules = await moduleModel.find({})

         const modulesWithBase64 = modules.map((module) => ({
            ...module.toObject(),
            image: module.image?.toString("base64")
            
        }));
       

        res.status(200).json({message:modulesWithBase64})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_module = async(req,res)=>{
     try{

        const {module_id:moduleId} = req.params

        const module = await moduleModel.findOne({_id:moduleId})
       

        res.status(200).json({message:module})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}