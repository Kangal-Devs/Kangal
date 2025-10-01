const {commonTaskReportModel} = require("../models/commonTaskReportModel.js")


exports.create_common_task_report = async (req, res) => {
    try {
        let {
           userId,
            commonTaskId,
            reason
        } = req.body;
        
        console.log("user:"+userId)
        console.log("reason:"+reason)
        console.log("task:"+commonTaskId)
        const commonTaskReport = await commonTaskReportModel.create({ 
            user:userId,
            commonTask:commonTaskId,
            reason })
        res.status(200).json({ message: "common task report criada" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}