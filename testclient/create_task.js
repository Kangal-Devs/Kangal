const axios = require("axios")

let commonLesson;



axios.post("http://localhost:5000/api/get_common_lesson2",{commonLesson:"Primeiro código"})
.then((res)=>{
  console.log(res.data.message._id)
  axios.post("http://localhost:5000/api/create_common_task",{
     commonLessonId: res.data.message._id,
  type: "toCorrect",
  text1: "Alguém tentou usar o <code>console.log()</code>, mas esqueceu parte da sintaxe. Corrija o código para que ele funcione corretamente e exiba a mensagem no console.",
  text2: "Reescreva o código idêntico, exceto a parte onde está o erro.",
  code: `console.log 'Olá mundo!'`,
  link: "",
  possibleAnswer: [],
  correctAnswer: [
        "console.log('Olá mundo!')",
        "console.log('olá mundo!')",
        "console.log(`Olá mundo!`)",
        "console.log(`olá mundo!`)",
        `console.log("Olá mundo!")`,
        `console.log("olá mundo!")`,

        "console.log('Olá mundo')",
        "console.log('olá mundo')",
        "console.log(`Olá mundo`)",
        "console.log(`olá mundo`)",
        `console.log("Olá mundo")`,
        `console.log("olá mundo")`,

    ]
},
{
  maxContentLength: Infinity,
  maxBodyLength: Infinity
})
.then((res1)=>{
    console.log(res1.data.message)
})
.catch((err)=>{
    console.log(err)
}

)

})
.catch((err)=>{console.log(err.message)})

