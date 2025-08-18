const { subjectModel } = require("../models/subjectModel.js")
const path = require("path")
const fs = require("fs")

const imageLocal = path.join(__dirname,"..","assets","JAVA.png")

const image = fs.readFileSync(imageLocal)

module.exports.create_subject = async(req,res)=>{
    // try{
    //     const {name} = req.body
    //     const subject = await subjectModel.create({image:image,name})

    //     res.status(200).json({message:"created"})
    // }
    // catch(err){
    //     res.status(500).json({message:err})
    // }
}
module.exports.get_all_subjects = async(req,res)=>{
    try{
        const subjects = await subjectModel.find({})
        
     const subjectsWithBase64 = subjects.map((subject) => ({
            ...subject.toObject(),
            image: subject.image?.toString("base64")
            
        }));
        res.status(200).json({message:subjectsWithBase64})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.get_subject = async(req,res)=>{
    try{
        const {subjectId} = req.body
        const subject = await subjectModel.findOne({_id:subjectId})
        res.status(200).json({message:{
            name:subject.name,
            image:subject.image.toString("base64"),
            _id:subject._id
            }
        })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}