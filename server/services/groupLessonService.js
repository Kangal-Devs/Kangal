const {groupLessonModel} = require("../models/groupLessonModel.js")
const {groupTaskModel} = require("../models/groupTaskModel.js")
const path = require("path")
const fs = require("fs")
module.exports.create_group_lesson = async(data)=>{
    const {name,description,group} = data.body
            let image = data?.file?.buffer
            const status = "A"
            const imageDefaultLocal = path.join(__dirname,"..","assets","default_lesson_picture.jpg")
    
            if(!image){
            image = fs.readFileSync(imageDefaultLocal)    
            }
    
            
                const groupLesson = await groupLessonModel.create({name,description,group,status,image})
            const countIncompleteGroupTask = await groupTaskModel.countDocuments({group,groupLesson:null})
            if(countIncompleteGroupTask==0){
                throw new Error("nenhuma lissão para ser criada")
            }

            const groupTasks = await groupTaskModel.updateMany({groupLesson:null,group},{$set:{groupLesson:groupLesson._id}})

}