const { userCommonLessonModel } = require("../models/userCommonLessonModel.js")

exports.create_user_common_lesson = async (req, res) => {
    try {
        const { userId, commonLessonId } = req.body

        const userCommonLesson = await userCommonLessonModel.create({
            user: userId,
            commonLesson: commonLessonId,
            points: 0,
            status: "toDo"
        })

        res.status(200).json({ message: "usercommonlesson atualizado" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.update_user_common_lesson = async (req, res) => {
    try {
        const {userCommonLessonId, points } = req.body

        const userCommonLesson = await userCommonLessonModel.findByIdAndUpdate({
            _id: userCommonLessonId,
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
