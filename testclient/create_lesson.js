const axios = require("axios")
const js_common_lessons = require("./javascript_common_lessons.json")

axios.post("http://localhost:5000/api/create_common_lesson",{
     "name":"Else e else if",
    "introduction": "Quando usamos apenas o if, o programa verifica uma condição e executa um bloco de código se ela for verdadeira. Mas… e se não for? Fica um vazio? É aqui que entram o else e o else if, funcionando como um verdadeiro escape no fluxo da programação.",
    "color": "#30C4DE",
    "points": 140
})
.then((res)=>{console.log(res.data.message)})
.catch((err)=>{console.log(err)})

// verde: #BEFF55 --
// azul: #36AFE4 --
// amarelo: #FFF600 --
// roxo: #AD51EA --
// ciano: #30C4DE
// branco: #FFFFFF --