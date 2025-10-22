const {userModel} = require("../models/userModel.js")
const {moduleModel} = require("../models/moduleModel.js")
const {commonLessonModel} = require("../models/commonLessonModel.js")
const {userCommonLessonModel} = require("../models/userCommonLessonModel.js")


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
    // let {userId:user_id} = data
    // let {commonLessonId:common_lesson_id} = data

    // const commonLesson = await commonLessonModel.findOne({_id:common_lesson_id})

    // const userCommonLessons = await userCommonLessonModel.find({user:user_id})
    // const module = await commonLessonModel.findOne({_id:common_lesson_id}).module

    // const commonLessons = await commonLessonModel.find({module})

    // const userCommonLesson2 = await userCommonLessonModel.create(
    //     {commonLesson: commonLessons[commonLessons.indexOf(commonLesson)+2]._id,
    //         userId:user_id,
    //         status:"toDo",
    //         points: null
    //     }
    // )


}