const { userCommonLessonModel } = require("../models/userCommonLessonModel.js")
const { commonLessonModel } = require("../models/commonLessonModel.js")
const {get_all_user_common_lesson,create_user_common_lesson} = require("../services/userCommonLessonService.js")

exports.create_user_common_lesson = async (req, res) => {
    try {
        const { userId, commonLessonId,moduleId } = req.body
        if(moduleId){
            const commonLesson = await commonLessonModel.findOne({module:moduleId})

            const userCommonLesson = await userCommonLessonModel.create({
            user: userId,
            commonLesson: commonLesson._id,
            points: null,
            status: "toDo"
        }) 

            return res.status(200).json({ message: commonLesson })
        }

     
        create_user_common_lesson({userId,commonLessonId})
        res.status(200).json({message:"atualizado"})

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.update_user_common_lesson = async (req, res) => {
    try {
        const {user_common_lesson_id:userCommonLessonId} = req.params
        const {points} = req.body

        const userCommonLesson = await userCommonLessonModel.findByIdAndUpdate(
            userCommonLessonId,
            {
            points:points,
            status:"did"
        })
        res.status(200).json({ message: "usercommonlesson atualizado" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//FUNÇÃO ABAIXO É USADA APENAS NO MODO DEV, USUARIO NÃO TEM ACESSO PELO FRONT
exports.delete_user_common_lesson = async (req, res) => {
    try {
        const {userCommonLessonId} = req.params

        const userCommonLesson = await userCommonLessonModel.findByIdAndDelete({
            _id: userCommonLessonId
        })
        res.status(200).json({ message: "usercommonlesson deletado" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.get_all_user_common_lesson = async(req,res)=>{
    try {
        const {moduleId:module_id,userId:user_id} = req.params

        const response1 = await get_all_user_common_lesson({module_id,user_id})
      
        res.status(200).json({message:response1})
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.get_user_common_lesson = async(req,res)=>{
    try{
        const {commonLessonId:common_lesson_id} = req.params
        const {userId:user_id} = req.params
        const userCommonLesson = await userCommonLessonModel.findOne({commonLesson:common_lesson_id,user:user_id})
        return res.status(200).json({message:userCommonLesson})
    }
    catch(err){
         res.status(500).json({ message: err.message })
    }
}