const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

const {complaintModel} = require("./models/complaintModel.js")

mongoose.connect("mongodb://localhost:27017/Kangal")

app.post("/api/complaints",async (req,res)=>{
    try{
    let {userName,name,email,description,category} = req.body;

    !category?category="Anúncio":category=category

    const complaint = await complaintModel.create({userName,name,email,description,category})
    res.status(201).json({message:"Reclamação criada"})
    }
    catch(err){
        res.status(408).json({message:err.message})
    }
})

app.listen(5000)