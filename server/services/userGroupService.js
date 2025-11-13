const {solicitationModel} = require("../models/solicitationModel.js")
const {userGroupModel} = require("../models/userGroupModel.js")

module.exports.create_fast_user_group = async (data)=>{
    const groupId = data.params.groupId;
    const userId = data.params.userId;
    const solicitation = await solicitationModel.findOne({group:groupId,user:userId})
    if(solicitation){
        await solicitation.deleteOne()
        const userGroup = await userGroupModel.create({user:userId,group:groupId})
        return;
    }
    
        const userGroup = await userGroupModel.create({user:userId,group:groupId})
    
}