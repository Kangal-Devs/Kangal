const {complaintModel} = require("../models/complaintModel.js")


exports.complaints = async (req, res) => {
    try {
        let {
            userName,
            name,
            email,
            description,
            category
        } = req.body;
        !category ? category = "Anúncio" : category = category

        const complaint = await complaintModel.create({ userName, name, email, description, category })
        res.status(201).json({ message: "Reclamação criada" })
    }
    catch (err) {
        res.status(408).json({ message: err.message })
    }
}