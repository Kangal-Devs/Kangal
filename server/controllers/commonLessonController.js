const {commonLessonModel} = require("../models/commonLessonModel")
const {moduleModel} = require("../models/moduleModel")
const fs = require("fs")
const path = require("path")
module.exports.create_common_lesson = async(req,res)=>{
    try{
        const imagesLocal = path.join(__dirname,"..","assets")
       
     
         const imagesLocal1 = fs.readdirSync(imagesLocal).map((image)=>{
            return path.join(__dirname,"..","assets",image)
        }).filter((image)=>{return image.includes("commonLessonImage")})
       
        const images = imagesLocal1.map((image)=>{return fs.readFileSync(image)})

        const {points,name,introduction} = req.body
        const module = await moduleModel.findOne({name:"Javascript"})
        const image = images[1]

        res.status(200).json({message:images})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}