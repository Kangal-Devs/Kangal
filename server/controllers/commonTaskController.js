const {commonTaskModel} = require("../models/commonTaskModel.js")
const {commonLessonModel} = require("../models/commonLessonModel.js")

module.exports.create_common_task = async (req,res)=>{
    try{

        const commonLesson = await commonLessonModel.findOne({name:"O que é JavaScript?"})

        const {
            // commonLessonId,
            type,
            text1,
            text2,
            possibleAnswers,
        correctAnswers,
        code,
        note,
        link,
        image
            } = req.body

        const commonTask = await commonTaskModel.create({type,
            text1,
            text2,
            possibleAnswers,
        correctAnswers,
        code,
        link,
        note,
        commonLesson:commonLesson._id})

        res.status(200).json({message:` exercicio criado: \n ${text1.slice(0,10)}...`})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports.get_common_task = async (req,res)=>{
    try{
       
        const {common_task_id:commonTaskId} = req.params

        const commonTask = await commonTaskModel.findOne({_id:commonTaskId})
        res.status(200).json({message:commonTask})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.get_all_common_task = async (req,res)=>{
    try{

        const {common_lesson_id:commonLessonId} = req.params

        const commonTasks = await commonTaskModel.find({commonLesson:commonLessonId})
        res.status(200).json({message:commonTasks})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}