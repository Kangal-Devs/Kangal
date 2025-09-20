const axios = require("axios")

axios.post("http://localhost:5000/api/create_common_task",{
  "type": "explanation",
  "text1": "📌 O que é JavaScript?\n\nJavaScript (ou JS) é uma linguagem de programação leve e interpretada, muito usada para criar páginas web dinâmicas e interativas.\n\nEle é executado diretamente no navegador do usuário (front-end), controlando o comportamento da página e permitindo que ela reaja às ações do usuário.\n\nAlém disso, com o uso do Node.js, o JavaScript também pode ser executado no servidor (back-end), controlando regras do sistema, banco de dados e comunicação com outros serviços.\n\nGraças a essa versatilidade, o JavaScript é hoje uma das linguagens mais populares do mundo, sendo usado no desenvolvimento de sites, aplicativos móveis, jogos e muito mais.",
  "note": "JavaScript está presente em praticamente todos os sites da web."
})
.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
}

)