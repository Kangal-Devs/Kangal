const {userGroupLessonModel} = require("../models/userGroupLessonModel.js")

module.exports.create_user_group_lesson = async(req,res)=>{
    try{
        const {groupLessonId,userId} = req.body

        const userGroupLesson = await userGroupLessonModel.create({groupLesson:groupLessonId,user:userId,description:null,score:null})

        res.status(200).json({message:"criado"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports.get_user_group_lesson = async(req,res)=>{
    try{
        const {group_lesson_id:groupLessonId,user_id:userId} = req.params

        console.log("group"+groupLessonId)
        console.log("user"+userId)
        const userGroupLesson = await userGroupLessonModel.findOne({groupLesson:groupLessonId,user:userId})

        res.status(200).json({message:userGroupLesson})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.get_all_user_group_lesson = async(req,res)=>{
    try{
        const {group_lesson_id:groupLessonId} = req.params

        const userGroupLessons = await userGroupLessonModel.find({groupLesson:groupLessonId})

        res.status(200).json({message:userGroupLessons})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.update_user_group_lesson = async(req,res)=>{
    try{
        const {user_group_lesson_id:userGroupLessonId} = req.params

        const {score,message} = req.body
        const userGroupLesson = await userGroupLessonModel.findByIdAndUpdate(userGroupLessonId,{$set:{message,score}})

        res.status(200).json({message:userGroupLesson})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}