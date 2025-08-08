const fs = require("fs")
const path = require("path")
const axios = require("axios")

const formData = new FormData();
// formData.append("title", "hasOwnProperty()");

// formData.append("description1",
// `O método hasOwnProperty() é uma função disponível em todos os objetos JavaScript que verifica se o objeto possui uma propriedade específica como sua própria propriedade (não herdada via cadeia de protótipos). Ele retorna um valor booleano: true se a propriedade pertence diretamente ao objeto, e false caso contrário.

// Esse método é útil para garantir que uma propriedade existe no próprio objeto, evitando que propriedades herdadas sejam consideradas, o que é importante para evitar erros e comportamentos inesperados durante a iteração ou manipulação de objetos.`);

// formData.append("description2",
// `Utilizar hasOwnProperty() é uma prática recomendada ao iterar sobre objetos usando for...in, pois esse loop itera também sobre propriedades herdadas do protótipo. Com o método, podemos filtrar somente as propriedades próprias do objeto.

// Além disso, ele ajuda a validar a existência de propriedades antes de acessá-las, melhorando a robustez do código e prevenindo exceções.

// É um método seguro e amplamente utilizado para inspeção e controle de objetos em JavaScript.`);

// formData.append("note", "hasOwnProperty() verifica propriedades próprias, ignorando as herdadas.");

// formData.append("code1", `
// // Exemplo básico de uso de hasOwnProperty()
// const pessoa = {
//   nome: "João",
//   idade: 30
// };

// console.log(pessoa.hasOwnProperty("nome"));  // true
// console.log(pessoa.hasOwnProperty("toString"));  // false, pois vem do protótipo
// `);

// formData.append("code2", `
// // Usando hasOwnProperty() para filtrar propriedades no for...in
// const obj = Object.create({ heranca: "valor herdado" });
// obj.propriedade1 = "valor1";
// obj.propriedade2 = "valor2";

// for (let chave in obj) {
//   if (obj.hasOwnProperty(chave)) {
//     console.log(\`Própria: \${chave} = \${obj[chave]}\`);
//   } else {
//     console.log(\`Herdada: \${chave}\`);
//   }
// }

// /* Saída:
// Própria: propriedade1 = valor1
// Própria: propriedade2 = valor2
// Herdada: heranca
// */
// `);



// formData.append("subjectName","JavaScript")

// axios.post("http://localhost:5000/api/create_document",formData)
// .then((res)=>{console.log(res)})
// .catch((err)=>console.log(err))





function generateLevelTable(maxLevel = 99, xpInicial = 50, incrementoInicial = 50) {
  const niveis = [];
  let xpMin = 0;
  let incremento = incrementoInicial;
  let xpMax = xpMin + xpInicial;

  for (let level = 0; level <= maxLevel; level++) {
    niveis.push({
      level,
      xpMin,
      xpMax
    });

    // Atualiza valores para o próximo nível
    xpMin = xpMax + 1;
    incremento += 50; // Aumenta a dificuldade
    xpMax = xpMin + incremento - 1;
  }

  return niveis;
}
console.log(generateLevelTable())