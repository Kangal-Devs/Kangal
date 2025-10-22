const { userModel } = require("../models/userModel.js")
const { myPlanModel } = require("../models/myPlanModel.js")
const { planModel } = require("../models/planModel.js")
const jwt = require("jsonwebtoken")
const { TOKEN_KEY } = require("../config.js")
const fs = require("fs")
const path = require("path")

//PEGAR USUARIO PELO ID 
exports.get_user = async (req,res)=>{
    try{
            const {_id} = req.body
            const user = await userModel.findOne({_id})
            if(user){
                const user2 = {
                    email:user.email,
                    _id:user._id,
                    name:user.name,
                    xp:user.xp,
                    date:user.date,
                    image:user.image.toString('base64'),
                    github:user.github,
                    gender:user.gender,
                    accountType:user.accountType,
                    password:user.password,
                    createdAt:user.createdAt
                }
                return res.status(200).json({message:user2})
            }
            res.status(404).json({message:"not found"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
//PEGAR USUARIO PELO NOME
exports.get_user2 = async (req,res)=>{
    try{
            const {name} = req.body
            const user = await userModel.findOne({name})
            if(user){
                const user2 = {
                    email:user.email,
                    _id:user._id,
                    name:user.name,
                    xp:user.xp,
                    date:user.date,
                    image:user.image.toString('base64'),
                    github:user.github,
                    gender:user.gender,
                    accountType:user.accountType,
                    password:user.password,
                    createdAt:user.createdAt
                }
                return res.status(200).json({message:user2})
            }
            res.status(404).json({message:"not found"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.get_users_limit5 = async (req,res)=>{
    try{
            const {userName} = req.body;
            const regex = new RegExp(userName, 'i');
            const users = await userModel.find({ name: regex }).limit(5);
            
            let array_users; // eu crio esse array ao invez de usar oque o mongoose me retorna, pelo motivo de que eu tenho que configurar a imagem de cada objeto que o mongoose retorna;

            array_users = users.map((user)=>{
                return {
                    email:user.email,
                    _id:user._id,
                    name:user.name,
                    xp:user.xp,
                    date:user.date,
                    image:user.image.toString('base64'),
                    github:user.github,
                    gender:user.gender,
                    accountType:user.accountType,
                    password:user.password,
                    createdAt:user.createdAt
                }
            })

            return res.status(200).json({message:array_users})
           
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

//ROTA APENAS VERIFICAR EMAIL GOOGLE -- SIGNIN COM GOOGLE
exports.email_verification = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email, accountType: "google" })
        if (user) {
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    xp: user.xp,
                    date: user.date.toISOString().slice(0, 10),
                    accountType: user.accountType,
                    github: user.github,
                    gender: user.gender,
                    createdAt:user.createdAt
                },
                TOKEN_KEY, { expiresIn: "1h" })
            res.cookie("token", token, { httpOnly: true })
            return res.status(200).json({ message: "email already used", image: user.image.toString('base64') })
        }
        res.status(200).json({ message: "email not used" })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//SIGNIN COM COMMON
exports.signin = async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await userModel.findOne({ name, password, accountType: "common" })
        if (user) {
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    xp: user.xp,
                    date: user.date.toISOString().slice(0, 10),
                    accountType: user.accountType,
                    github: user.github,
                    gender: user.gender,
                    createdAt:user.createdAt
                },
                TOKEN_KEY, { expiresIn: "1h" })
            res.cookie("token", token, { httpOnly: true })
            
            return res.status(200).json({ message: "achado", image: user.image.toString('base64') })
        }
        res.status(404).json({ message: "errorType-16" }) // errorType16:Nome ou senha incorreto
    }
    catch (err) {
        res.status(400).json({ message: "errorType-17" })
    }
}
// COMMONS E GOOGLE SIGNUP PASSARÃO POR ESSA ROTA V
exports.signup = async (req, res) => {
    try {
        const imageLocal = path.join(__dirname,"..", "assets", "defaultProfilePicture.png")
        const image = fs.readFileSync(imageLocal)
        const { accountType, name, email, password } = req.body
        const date = new Date(req.body.date)
        const xp = 0
        const github = null
        const gender = "Prefer not to say"
        const user = await userModel.create({ accountType, name, email, password, xp, date, image, gender, github })

        const plan = await planModel.findOne({name:"Basic"})
        const myPlan = await myPlanModel.create({user:user._id,plan:plan._id})

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            xp: user.xp,
            date: user.date.toISOString().slice(0, 10),
            accountType: user.accountType,
            github: user.github,
            gender: user.gender,
            createdAt:user.createdAt
        },
            TOKEN_KEY,
            { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({ message: "Conta criada", image: user.image.toString('base64') })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.authorization = async (req, res) => {
    try {

        const token = req.cookies.token
        // console.log(jwt.decode(token))
        const verify_token = jwt.verify(token, TOKEN_KEY)
        res.status(200).json({ message: verify_token })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
        // console.log(req.cookies)
    }
}

exports.clear_cookie = (req, res) => {
    try {
        const token = ""
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({ message: "cookie limpo" })
    } catch (err) {
        res.status(400).json({ message: "erro ao limpar cookie" })
    }
}

exports.user_update = async (req, res) => {
    try {
        const image = req?.file?.buffer
        // console.log(typeof(image))
        const { email, password, gender, github ,xp} = req.body
        let { _id } = req.params;
        // console.log(email)
        // console.log("xp"+xp)
        if(xp){
            
            var user = await userModel.findByIdAndUpdate(_id, {xp}, { new: true, runValidators: true })

            const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            xp: user.xp,
            date: user.date.toISOString().slice(0, 10),
            accountType: user.accountType,
            github: user.github,
            gender: user.gender,
            createdAt:user.createdAt
        },
            TOKEN_KEY,
            { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true })



            return res.status(200).json({ message: "Conta atualizada xp"})
        }

        
        const date = new Date(req.body.date)

        _id = _id.replace(/[^\da-f]/gi, "");

        // console.log(req?.file?.buffer)
        // console.log(req.body.email)
        if (image) {

            var user = await userModel.findByIdAndUpdate(_id, { email, password, gender, github, date, image }, { new: true, runValidators: true })
            
        }
        else {
            var user = await userModel.findByIdAndUpdate(_id, { email, password, gender, github, date }, { runValidators: true, new: true })
        }


        if (!user) {
            return res.status(404).json({ message: "not found" })
        }
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            xp: user.xp,
            date: user.date.toISOString().slice(0, 10),
            accountType: user.accountType,
            github: user.github,
            gender: user.gender,
            createdAt:user.createdAt
        },
            TOKEN_KEY,
            { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({ message: "Conta atualizada", image: user.image.toString('base64') })


    } catch (err) {

        res.status(400).json({ message: err.message })
    }
}