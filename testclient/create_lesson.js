const axios = require("axios")
const js_common_lessons = require("./javascript_common_lessons.json")

axios.post("http://localhost:5000/api/create_common_lesson",{
     "name":"Usando oper. matemáticos",
    "introduction": "Agora que você conhece os operadores matemáticos, chegou a hora de usá-los de verdade. Com eles, você pode somar, subtrair, multiplicar e dividir números dentro do seu programa, criando cálculos que respondem às suas instruções e permitem que o computador execute tarefas como um verdadeiro assistente inteligente.",
    "color": "#BEFF55",
    "points": 130
})
.then((res)=>{console.log(res.data.message)})
.catch((err)=>{console.log(err)})

// verde: #BEFF55 --
// azul: #36AFE4 --
// amarelo: #FFF600 --
// roxo: #AD51EA --
// ciano: #30C4DE
// branco: #FFFFFF --