const {gameModel} = require("../models/gameModel.js")
const path = require("path")
const fs = require("fs")
module.exports.create_game = async(req,res)=>{
    try{

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
    catch(err){
        res.status(500).json({message:err})
    }
}
