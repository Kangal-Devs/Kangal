const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const TOKEN_KEY = "_@_@_"
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())


const { complaintModel } = require("./models/complaintModel.js")
const { userModel } = require("./models/userModel.js")

mongoose.connect("mongodb://localhost:27017/Kangal")

app.post("/api/complaints", async (req, res) => {
    try {
        let { userName, name, email, description, category } = req.body;

        !category ? category = "Anúncio" : category = category

        const complaint = await complaintModel.create({ userName, name, email, description, category })
        res.status(201).json({ message: "Reclamação criada" })
    }
    catch (err) {
        res.status(408).json({ message: err.message })
    }
})

//ROTA APENAS VERIFICAR EMAIL GOOGLE -- SIGNIN COM GOOGLE
app.post("/api/email_verification", async (req, res) => {
    try {


        const { email } = req.body

        const user = await userModel.findOne({ email, accountType: "google" })

        if (user) {

            const token = jwt.sign({ _id:user._id, name: user.name, email: user.email, password: user.password, xp: user.xp, date: user.date.toISOString().slice(0, 10), accountType: user.accountType }, TOKEN_KEY, { expiresIn: "1m" })

            res.cookie("token", token, { httpOnly: true })

            return res.status(200).json({ message: "email already used" })

        }
        res.status(200).json({ message: "email not used" })
    }
    catch (err) {
        res.status(400).json({ message: "internal error" })
    }
})

//SIGNIN COM COMMON
app.post("/api/signin", async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await userModel.findOne({ name, password, accountType: "common" })
        if (user) {
            const token = jwt.sign({ _id : user._id,name: user.name, email: user.email, password: user.password, xp: user.xp, date: user.date.toISOString().slice(0, 10), accountType: user.accountType }, TOKEN_KEY, { expiresIn: "1m" })

            res.cookie("token", token, { httpOnly: true })

            return res.status(200).json({ message: "achado" })
        }
        res.status(404).json({ message: "errorType-16" }) // errorType16:Nome ou senha incorreto
    }
    catch (err) {
        res.status(400).json({ message: "errorType-17" })
    }
})
// COMMONS E GOOGLE SIGNUP PASSARÃO POR ESSA ROTA V
app.post("/api/signup", async (req, res) => {
    try {

        const { accountType, name, email, password } = req.body
        const date = new Date(req.body.date)
        const xp = 0
        const user = await userModel.create({ accountType, name, email, password, xp, date })

        const token = jwt.sign({ _id : user._id,name: user.name, email: user.email, password: user.password, xp: user.xp, date: user.date.toISOString().slice(0, 10), accountType: user.accountType }, TOKEN_KEY, { expiresIn: "1m" })
        res.cookie("token",token,{httpOnly:true})

        res.status(200).json({ message: "Conta criada" })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.post("/api/authorization",async (req,res)=>{
    try{
        const token = req.cookies.token
        const verify_token = jwt.verify(token,TOKEN_KEY)

        res.status(200).json({message:verify_token})

      
    }
    catch(err){
        res.status(400).json({message:err.message})
        console.log(req.cookies)
    }
})

app.post("/api/clear_cookie",(req,res)=>{
     try{const token = ""
     res.cookie("token",token,{httpOnly:true})
     res.status(200).json({message:"cookie limpo"})
    }catch(err){
        res.status(400).json({message:"erro ao limpar cookie"})
     }
})
app.listen(5000)