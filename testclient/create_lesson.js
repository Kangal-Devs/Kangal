const axios = require("axios")
const js_common_lessons = require("./javascript_common_lessons.json")

axios.post("http://localhost:5000/api/create_common_lesson",{
     "name":"Usando tag de áudio",
    "introduction": "Agora é sua vez de praticar. A tag <audio> permite inserir sons e músicas em uma página, tornando o conteúdo mais envolvente. Neste exercício, você vai aplicar essa tag no código e experimentar atributos que controlam a forma como o áudio é reproduzido.",
    "color": "#AD51EA",
    "points": 100
})
.then((res)=>{console.log(res.data.message)})
.catch((err)=>{console.log(err)})

// verde: #BEFF55 --
// azul: #36AFE4 --
// amarelo: #FFF600 --
// roxo: #AD51EA --
// ciano: #30C4DE
// branco: #FFFFFF --