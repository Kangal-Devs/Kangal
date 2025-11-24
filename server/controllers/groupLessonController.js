const {groupLessonModel} = require("../models/groupLessonModel.js")
const groupLessonService = require("../services/groupLessonService.js")
const path = require("path")
const fs = require("fs")

module.exports.create_group_lesson = async(req,res)=>{
    try{
     
            await groupLessonService.create_group_lesson(req)
            res.status(200).json({message:"created lesson"})


    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_all_group_lesson = async(req,res)=>{
    try{
        const {group_id:groupId} = req.params

        const groupLessons = await groupLessonModel.find({group:groupId})
        // if(groupLessons.length){
        //     return res.status(200).json({message:[]})
        // }
        const groupLessonsWithBase64 = groupLessons.map((groupLesson)=>{
            return {_id:groupLesson._id,name:groupLesson.name,description:groupLesson.description,group:groupLesson.group,status:groupLesson.status,image:groupLesson.image.toString("base64"),createdAt:groupLesson.createdAt
            }
        })

        res.status(200).json({message:groupLessonsWithBase64})
    }
    catch(err){
         res.status(500).json({message:err.message})
    }
}
module.exports.get_group_lesson = async(req,res)=>{
    try{
        const {group_lesson_id:groupLessonId} = req.params
      
        const groupLesson = await groupLessonModel.findOne({_id:groupLessonId})
        const groupLessonWithBase64 = {
            description:groupLesson.description,
            name:groupLesson.name,
            image:groupLesson.image.toString("base64"),
            _id:groupLesson._id,
            group:groupLesson.group
        }
        res.status(200).json({message:groupLessonWithBase64})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.update_group_lesson= async(req,res)=>{
    try{
        const {group_lesson_id:groupLessonId} = req.params;
        
        const {name,description} = req.body
        const image = req?.file?.buffer

        if(image){
            const groupLesson = await groupLessonModel.findByIdAndUpdate(groupLessonId,{name,description,image})
        }
        else{
          const groupLesson = await groupLessonModel.findByIdAndUpdate(groupLessonId,{name,description})  
        }
        res.status(200).json({message:"updated group lesson"})
        
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}