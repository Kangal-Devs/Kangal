const {groupModel} = require("../models/groupModel.js")
const {userGroupModel} = require("../models/userGroupModel.js")
const path = require("path")
const fs = require("fs")

exports.create_group = async (req,res)=>{
    try{
    const imageLocal = path.join(__dirname,"..","assets","DefaultGroupPicture.png");
    const {name,description,owner} = req.body;
    const image = fs.readFileSync(imageLocal)
    const group = await groupModel.create({name,description,owner,image})

    const userGroup = await userGroupModel.create({user:owner,group:group._id})
    
    res.status(200).json({message:"grupo criado"})


    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.get_group = async (req,res)=>{
    try{
        const {_id} = req.body

        const group = await groupModel.findOne({_id:_id})
        console.log(group)
        res.status(200).json({
            message:{
                _id:group._id,
                name:group.name,
                image:group.image.toString('base64'),
                description:group.description,
                owner:group.owner,
                name:group.name
            }})
    }
    catch(err){
          res.status(500).json({message:err.message})
    }

}