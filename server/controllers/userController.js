const { userModel } = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const { TOKEN_KEY } = require("../config.js")
const fs = require("fs")
const path = require("path")
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
                    gender: user.gender
                },
                TOKEN_KEY, { expiresIn: "30m" })
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
                    gender: user.gender
                },
                TOKEN_KEY, { expiresIn: "30m" })
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
        console.log(image)
        const { accountType, name, email, password } = req.body
        const date = new Date(req.body.date)
        const xp = 0
        const github = null
        const gender = "Prefer not to say"
        const user = await userModel.create({ accountType, name, email, password, xp, date, image, gender, github })

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            xp: user.xp,
            date: user.date.toISOString().slice(0, 10),
            accountType: user.accountType,
            github: user.github,
            gender: user.gender
        },
            TOKEN_KEY,
            { expiresIn: "30m" })
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
        console.log(jwt.decode(token))
        const verify_token = jwt.verify(token, TOKEN_KEY)
        res.status(200).json({ message: verify_token })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
        console.log(req.cookies)
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
        const { email, password, gender, github } = req.body
        let { _id } = req.params;
        const date = new Date(req.body.date)

        _id = _id.replace(/[^\da-f]/gi, "");

        console.log(req?.file?.buffer)
        console.log(req.body.email)
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
            gender: user.gender
        },
            TOKEN_KEY,
            { expiresIn: "30m" })
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({ message: "Conta atualizada", image: user.image.toString('base64') })


    } catch (err) {

        res.status(400).json({ message: err.message })
    }
}