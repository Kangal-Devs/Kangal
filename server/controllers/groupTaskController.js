const { groupTaskModel } = require("../models/groupTaskModel.js")

module.exports.create_group_task = async (req, res) => {
    try {

        const { title, description1, description2, code, type, group } = req.body
        let { possibleAnswers } = req.body
        let possibleAnswersFiltered;
        if (!(type == "select")) {
            possibleAnswersFiltered = null
        }
        else {
            possibleAnswers = possibleAnswers.split(",")
            possibleAnswersFiltered = possibleAnswers.filter((option) => { return option })
            if (!(possibleAnswersFiltered.length >= 2)) {
                throw new Error("insuficiente possibleanswers")
            }
        }
        const groupLesson = null
        const image = req?.file?.buffer

        const groupTask = await groupTaskModel.create({ title, description1, description2, code, possibleAnswers: possibleAnswersFiltered, type, group, groupLesson, image })
        res.status(200).json({ message: possibleAnswersFiltered })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports.get_all_incomplete_group_task = async (req, res) => {
    try {
        const { group_id: groupId } = req.params
        const groupTasks = await groupTaskModel.find({ group: groupId, groupLesson: null })
        res.status(200).json({ message: groupTasks })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports.get_all_group_lesson_tasks = async (req, res) => {
    try {
        const { group_lesson_id: groupLessonId } = req.params
        const groupTasks = await groupTaskModel.find({ groupLesson: groupLessonId })

        let groupTasksWithBase64
        if (groupTasks.length) {
            groupTasksWithBase64 = groupTasks.map((groupTask) => {
            
                    return {
                        title: groupTask.title,
                        description1: groupTask.description1,
                        description2: groupTask?.description2,
                        code: groupTask?.code,
                        type: groupTask.type,
                        image: groupTask?.image?.toString("base64"),
                        possibleAnswers: groupTask?.possibleAnswers,
                        _id: groupTask._id,
                        groupLesson: groupTask.groupLesson,
                        group: groupTask.group
                    }
                
            })
        }

        res.status(200).json({ message: groupTasksWithBase64  })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.get_group_task = async (req, res) => {
    try {
        const { group_task_id: groupTaskId } = req.params
        const groupTask = await groupTaskModel.findOne({ _id: groupTaskId })

        let groupTaskWithBase64;
        if (groupTask.image) {
            groupTaskWithBase64 = {
                type: groupTask.type,
                title: groupTask.title,
                code: groupTask.code,
                description1: groupTask.description1,
                description2: groupTask.description2,
                possibleAnswers: groupTask.possibleAnswers,
                group: groupTask.group,
                groupLesson: groupTask.groupLesson,
                image: groupTask?.image.toString("base64")
            }
        }
        else {
            groupTaskWithBase64 = {
                type: groupTask.type,
                title: groupTask.title,
                code: groupTask.code,
                description1: groupTask.description1,
                description2: groupTask.description2,
                possibleAnswers: groupTask.possibleAnswers,
                group: groupTask.group,
                groupLesson: groupTask.groupLesson,

            }
        }



        res.status(200).json({ message: groupTaskWithBase64 })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports.delete_group_task = async (req, res) => {
    try {
        const { group_task_id: groupTaskId } = req.params
        await groupTaskModel.findByIdAndDelete({ _id: groupTaskId })
        res.status(200).json({ message: "deleted group task" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}