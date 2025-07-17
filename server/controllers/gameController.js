const { gameModel } = require("../models/gameModel.js")
const path = require("path")
const fs = require("fs")

module.exports.get_game = async (req, res) => {
    try {
        const { id } = req.body
        const game = await gameModel.findOne({ _id: id })

        const gameWithBase64 = game.toObject()
        gameWithBase64.icon = gameWithBase64.icon.toString("base64")
         gameWithBase64.thumbnail = gameWithBase64.thumbnail.toString("base64")
         
        res.status(200).json({ message:gameWithBase64})
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

module.exports.get_all_games = async (req, res) => {
    try {
        const games = await gameModel.find({})

        const gamesWithBase64 = games.map((game) => ({
            ...game.toObject(), // transforma o documento mongoose em objeto simples
            thumbnail: game.thumbnail?.toString("base64") || null,
            icon: game.icon?.toString("base64") || null,
        }));


        res.status(200).json({ message: gamesWithBase64 })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }


}


module.exports.create_game = async (req, res) => {
    try {

        // const thumbnailLocal = path.join(__dirname,"..","assets","hangman_thumbnail.jpg")
        // const iconLocal = path.join(__dirname,"..","assets","hangman_icon.png")

        // const thumbnail = fs.readFileSync(thumbnailLocal)
        // const icon = fs.readFileSync(iconLocal)
        // console.log("passei por aqui")
        // const game = await gameModel.create(
        //     {name:"PING PONG",
        //     subject:"REACT | JAVASCRIPT | CSS",
        //     description:"O Jogo da Forca é um desafio clássico de adivinhação de palavras. O jogador tenta descobrir uma palavra secreta, letra por letra, antes de cometer muitos erros.A cada erro, uma parte do boneco é desenhada. Se errar 6 vezes, o boneco é completado e o jogo termina.",
        //     icon:icon,
        //     thumbnail:thumbnail,
        //     link:"/games/hangman"
        //     }
        // )
        // res.status(200).json({messae:"criado"})
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
