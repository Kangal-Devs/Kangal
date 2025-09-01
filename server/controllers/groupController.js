const {groupModel} = require("../models/groupModel.js")
const {userGroupModel} = require("../models/userGroupModel.js")
const path = require("path")
const fs = require("fs")

exports.create_group = async (req,res)=>{
    try{
    const imageLocal = path.join(__dirname,"..","assets","DefaultGroupPicture.png");
    const {name,description,owner} = req.body;
    const image = fs.readFileSync(imageLocal)

    let link1 = " ";
    let link2 = " ";
    let titleLink1 = " ";
    let titleLink2 = " "
    
    if(owner){
    
    const group = await groupModel.create({
        name,description,
        owner,
        image,
        link1:link1,
        link2:link2,
        titleLink2:titleLink2,
        titleLink1:titleLink1})

    const userGroup = await userGroupModel.create({user:owner,group:group._id})
    
    return res.status(200).json({message:"grupo criado",groupId:userGroup.group})

    }
    res.status(404).json({message:"owner not found"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.get_group = async (req,res)=>{
    try{
        const {_id} = req.body

        const group = await groupModel.findOne({_id:_id})
        res.status(200).json({
            message:{
                
                _id:group._id,
                name:group.name,
                image:group.image.toString('base64'),
                description:group.description,
                owner:group.owner,
                name:group.name,
                textLink1:group.textLink1,
                textLink2:group.textLink2,
                link2:group.link2,
                link1:group.link1,
                createdAt:group.createdAt,
            }})
    }
    catch(err){
          res.status(500).json({message:err.message})
    }

}

//A função abaixo retorna, quantos grupos um usuário é dono;
module.exports.get_count_owner_group = async (req,res)=>{
    try{
        const {userId} = req.body

        const countOwnerGroup = await groupModel.countDocuments({owner:userId})
        // const groups = await groupModel.find({owner:userId})
        // console.log(groups)
        res.status(200).json({message:countOwnerGroup})
    }
    catch(err){
          res.status(500).json({message:err.message})
    }
}

