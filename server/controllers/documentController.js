const { documentModel } = require("../models/documentModel.js")
const { subjectModel } = require("../models/subjectModel.js")

module.exports.create_document = async (req, res) => {
    try {
     

        

        const { title, description1, description2, code1, code2, note} = req.body

        const subject = await subjectModel.findOne({ name: req.body.subjectName })

        const document = await documentModel.create(
            {
                title,
                description1,
                description2,
                code1,
                code2,
                note,
                subject: subject._id
            }
        )

        res.status(200).json({ message: "created" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.get_all_documents = async(req,res)=>{
    try{
        const {subjectId} = req.body
        const documents = await documentModel.find({subject:subjectId})
        res.status(200).json({message:documents})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.get_document = async(req,res)=>{
    try{
        const {documentId} = req.body
        const document = await documentModel.findOne({_id:documentId})
        res.status(200).json({message:document})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}