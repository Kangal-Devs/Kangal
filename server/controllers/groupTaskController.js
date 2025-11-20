const {groupTaskModel} = require("../models/groupTaskModel.js")

module.exports.create_group_task = async(req,res)=>{
    try{
        
        const {title,description1,description2,code,type,group} = req.body
        let {possibleAnswers} = req.body
        let possibleAnswersFiltered;
        if(!(type=="select")){
            possibleAnswersFiltered = null
        }
        else{
        possibleAnswers = possibleAnswers.split(",")
        possibleAnswersFiltered = possibleAnswers.filter((option)=>{return option})
        if(!(possibleAnswersFiltered.length>=2)){
            throw new Error("insuficiente possibleanswers")
        }
        }
        const groupLesson = null
        const image = req?.file?.buffer
    
        const groupTask = await groupTaskModel.create({title,description1,description2,code,possibleAnswers:possibleAnswersFiltered,type,group,groupLesson,image})
            res.status(200).json({message:possibleAnswersFiltered})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_all_incomplete_group_task= async(req,res)=>{
    try{
        const {group_id:groupId} = req.params
        const groupTasks = await groupTaskModel.find({group:groupId,groupLesson:null})
        res.status(200).json({message:groupTasks})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_all_group_lesson_tasks= async(req,res)=>{
    try{
        const {group_lesson_id:groupLessonId} = req.params
        const groupTasks = await groupTaskModel.find({groupLesson:groupLessonId})
        res.status(200).json({message:groupTasks})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.delete_group_task = async(req,res)=>{
    try{
        const {group_task_id:groupTaskId}= req.params
        await groupTaskModel.findByIdAndDelete({_id:groupTaskId})
        res.status(200).json({message:"deleted group task"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}