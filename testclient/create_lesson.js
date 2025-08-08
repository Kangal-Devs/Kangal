const axios = require("axios")
const js_common_lessons = require("./javascript_common_lessons.json")

axios.post("http://localhost:5000/api/create_common_lesson",{
     "name":"Usando temp. literals",
    "introduction": "Com eles, você pode montar frases usando variáveis de forma muito mais clara, sem precisar ficar juntando pedaços com +. Basta usar crases (`) no lugar das aspas e inserir as variáveis dentro de ${}.",
    "color": "#AD51EA",
    "points": 160
})
.then((res)=>{console.log(res.data.message)})
.catch((err)=>{console.log(err)})

// verde: #BEFF55 --
// azul: #36AFE4 --
// amarelo: #FFF600 --
// roxo: #AD51EA --
// ciano: #30C4DE
// branco: #FFFFFF --