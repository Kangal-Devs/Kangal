const {commonLessonModel} = require("../models/commonLessonModel")
const {moduleModel} = require("../models/moduleModel")
const fs = require("fs")
const path = require("path")
module.exports.create_common_lesson = async(req,res)=>{
    try{
        const {name,introduction,color,points} = req.body
         
        
        
        const module1 = await moduleModel.findOne({name:"Java"})

        const folder = path.join(__dirname,"..","assets","CommonLessons")

        const imagesBlue = fs.readdirSync(folder).filter((image)=>{return image.includes("blue")})
        const imagesGreen = fs.readdirSync(folder).filter((image)=>{return image.includes("green")})
        const imagesPurple = fs.readdirSync(folder).filter((image)=>{return image.includes("purple")})
        const imagesYellow = fs.readdirSync(folder).filter((image)=>{return image.includes("yellow")})
        const imagesCyan = fs.readdirSync(folder).filter((image)=>{return image.includes("cyan")})
        const imagesWhite = fs.readdirSync(folder).filter((image)=>{return image.includes("white")})

        const images2Blue = imagesBlue.map((image)=>{return fs.readFileSync(path.join(__dirname,"..","assets","CommonLessons",image))})

        const images2Green = imagesGreen.map((image)=>{return fs.readFileSync(path.join(__dirname,"..","assets","CommonLessons",image))})

        const images2Purple = imagesPurple.map((image)=>{return fs.readFileSync(path.join(__dirname,"..","assets","CommonLessons",image))})

        const images2Yellow = imagesYellow.map((image)=>{return fs.readFileSync(path.join(__dirname,"..","assets","CommonLessons",image))})

        const images2Cyan = imagesCyan.map((image)=>{return fs.readFileSync(path.join(__dirname,"..","assets","CommonLessons",image))})

        const images2White = imagesWhite.map((image)=>{return fs.readFileSync(path.join(__dirname,"..","assets","CommonLessons",image))})

        const commonLesson = await commonLessonModel.create({name:name,introduction:introduction,color:color,points:points,image:images2Green[3],module:module1._id})


        res.status(200).json({message:"Criado: "+name})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.get_all_common_lessons = async (req,res)=>{
    try{
        const {moduleId} = req.body
        const common_lessons = await commonLessonModel.find({module:moduleId})

        const commonLessonsWithBase64 = common_lessons.map((lesson) => ({
            ...lesson.toObject(),
            image: lesson.image?.toString("base64")
            
        }));

        return res.status(200).json({message:commonLessonsWithBase64})
    }
    catch(err){
         res.status(500).json({message:err.message})
    }
}
//Encontra a questão pelo id
module.exports.get_common_lesson = async (req,res)=>{
    try{
        const {commonLesson} = req.body
        const common_lesson = await commonLessonModel.findOne({_id:commonLesson})

        return res.status(200).json({message:common_lesson})
    }
    catch(err){
         res.status(500).json({message:err.message})
    }
}
//Encontra a questão pelo título
module.exports.get_common_lesson2 = async (req,res)=>{
    try{
        const {commonLesson} = req.body
        const common_lesson = await commonLessonModel.findOne({name:commonLesson})

        return res.status(200).json({message:common_lesson})
    }
    catch(err){
         res.status(500).json({message:err.message})
    }
}