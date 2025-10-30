const {userModel} = require("../models/userModel.js")
const {moduleModel} = require("../models/moduleModel.js")
const {commonLessonModel} = require("../models/commonLessonModel.js")
const {userCommonLessonModel} = require("../models/userCommonLessonModel.js")
const {Types} = require("mongoose")

module.exports.get_all_user_common_lesson = async(data)=>{
    var {user_id} = data
    var {module_id} = data

    var modules = await moduleModel.find()

    var userCommonLessons = await userCommonLessonModel.find({user:user_id})
    
    let filteredCommonLessons = await Promise.all(userCommonLessons.map(async (userCommonLesson)=>{
        return await commonLessonModel.findOne({_id:userCommonLesson.commonLesson,module:module_id})}))
    
    filteredCommonLessons = filteredCommonLessons.filter(Boolean);

    let filteredUserCommonLessons = await Promise.all(filteredCommonLessons.map(async(filteredCommonLesson)=>{
        return await userCommonLessonModel.findOne({commonLesson:filteredCommonLesson})
    }))

    return filteredUserCommonLessons
}

module.exports.create_user_common_lesson = async(data)=>{
    let {userId:user_id} = data
    let {commonLessonId:common_lesson_id} = data
    let object_id_common_lesson = Types.ObjectId.createFromHexString(common_lesson_id)

    //Eu pego essa tal lissão que o usuario me mandou, mas pego ela apenas para conseguir pegar o tal do modulo no qual ela pertence
    const commonLesson = await commonLessonModel.findOne({_id:object_id_common_lesson})
    
    const userCommonLesson1 = await userCommonLessonModel.findOne({user:user_id,commonLesson:object_id_common_lesson})

    const user_common_lesson_id = userCommonLesson1._id

    //pego o modulo 
    const module1 = commonLesson.module
     
    //descubro em que posição esse commonLesson estava, mas para isso preciso pegar o array de licoes
    const commonLessons = await commonLessonModel.find({module:module1})

    //agora eu irei ver a posição:
    const i = commonLessons.findIndex(lesson => lesson._id.toString() === commonLesson._id.toString())

    const userCommonLesson2 = await userCommonLessonModel.create({
        commonLesson: commonLessons[i+1],
        user:user_id,
        status:"toDo",
        points: null
    })

    const userCommonLesson3 = await userCommonLessonModel.findByIdAndUpdate(user_common_lesson_id,{status:"did"})
}

