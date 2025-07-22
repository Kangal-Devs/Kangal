// const skillsHangman = [

//     {
//         title: "Como usar Closures",
//         subject: "JavaScript",
//         description:
//             "Closures são um dos conceitos mais fundamentais e poderosos do JavaScript. Uma closure acontece quando uma função consegue lembrar e acessar variáveis externas ao seu escopo mesmo depois que a função que criou essas variáveis já foi executada. Isso acontece porque, em JavaScript, as funções são objetos de primeira classe e 'carregam' com elas uma referência ao escopo onde foram definidas.\n\nClosures são extremamente úteis em várias situações do dia a dia da programação, como:\n\n- Criar funções com dados 'privados' (encapsulamento)\n- Criar *factories* de funções (funções que retornam outras funções)\n- Trabalhar com tempo e eventos, como setTimeout e event listeners\n- Evitar o uso de variáveis globais\n- Controlar o estado interno de componentes em frameworks como React\n\nNo React, closures são muito comuns dentro do hook `useEffect`, onde funções internas têm acesso ao estado e props, mesmo após renderizações futuras. Também aparecem ao usar funções de atualização de estado com `setState((prev) => ...)`, para garantir acesso ao valor mais recente. Dominar closures ajuda a entender melhor o comportamento de funções assíncronas e renderizações em ciclos de vida de componentes.\n\nVocê pode (e deve) usar closures em praticamente todo tipo de projeto JavaScript moderno: jogos, páginas interativas, dashboards com gráficos, sistemas de login com dados encapsulados e especialmente em aplicações React.",

//         code: `useEffect(() => {
//   const isWinner = word.split('').every((l) => guessedLetters.includes(l));
//   if (isWinner || wrongGuesses >= 6) {
//     setGameOver(true);
//   }
// }, [guessedLetters, wrongGuesses, word]);

// const handleGuess = (letter) => {
//   if (gameOver || guessedLetters.includes(letter)) return;

//   // Aqui é uma closure: essa função lembra de gameOver, guessedLetters e word
//   setGuessedLetters((prev) => [...prev, letter]); // usa prev como closure para acessar valor atual
//   if (!word.includes(letter)) {
//     setWrongGuesses((prev) => prev + 1);
//   }
// };`,

//         descriptionExample:
//             "Este é um exemplo prático de closure, muito comum em JavaScript puro. Aqui, a função `contador` cria uma variável interna chamada `count` e retorna outra função que incrementa essa variável. Mesmo depois que a função externa já terminou sua execução, a função interna ainda consegue acessar e modificar `count`, graças à closure. Isso é muito útil em qualquer projeto que precise de estado interno encapsulado, como jogos, validadores, plugins de formulários ou componentes reutilizáveis com memória interna. Com isso, conseguimos guardar informações entre chamadas sem usar variáveis globais.",

//         codeExample: `function contador() {
//   let count = 0; // Variável interna encapsulada
//   return function () {
//     count++;     // A função interna lembra de count, mesmo após a externa já ter rodado
//     console.log(count);
//   };
// }

// const incrementar = contador();

// incrementar(); // 1
// incrementar(); // 2
// incrementar(); // 3`,

//     },
//     {
//         title: "Gerenciando estado com useState",
//         subject: "React",
//         description:
//             "`useState` é um hook do React que permite adicionar variáveis de estado em componentes funcionais. Antes do React Hooks (a partir da versão 16.8), apenas componentes de classe conseguiam manter estado.\n\nO estado é essencial para lidar com dados que mudam ao longo do tempo, como interações do usuário, carregamento de dados, valores dinâmicos, etc. Sempre que o estado muda, o componente é re-renderizado com os novos valores.\n\nNo seu código do jogo da forca, vários estados são utilizados: a palavra sorteada (`word`), as letras que o jogador já tentou (`guessedLetters`), a quantidade de erros (`wrongGuesses`) e se o jogo terminou (`gameOver`). Cada um desses estados é criado com `useState`, e as atualizações de estado fazem com que a interface do jogo reaja corretamente (ex: mostrar letras, mudar imagem, mostrar botão de reiniciar, etc).\n\nEsse padrão é usado em todo tipo de projeto React moderno: sistemas de login, dashboards, checklists, campos de formulários, listas de produtos, aplicativos de chat, e mais. Entender bem o estado permite que você crie interfaces reativas e interativas com facilidade.",

//         code: `const [word, setWord] = useState(getRandomWord);
// const [guessedLetters, setGuessedLetters] = useState([]);
// const [wrongGuesses, setWrongGuesses] = useState(0);
// const [gameOver, setGameOver] = useState(false);

// // Exemplo de atualização de estado:
// setGuessedLetters((prev) => [...prev, letter]); // adiciona nova letra
// setWrongGuesses((prev) => prev + 1);            // incrementa erros
// setGameOver(true);                              // finaliza o jogo
// setWord(getRandomWord);                         // reseta com nova palavra
// `,

//         descriptionExample:
//             "A seguir, temos um exemplo simples onde usamos `useState` para controlar o número de cliques em um botão. A cada clique, o número é incrementado e o componente é automaticamente re-renderizado mostrando o novo valor.\n\nEsse tipo de lógica é usado em contadores, interfaces de quiz, validações de formulário em tempo real, navegação entre abas e muito mais. O React se encarrega de atualizar apenas o que mudou na tela, graças ao uso de `useState`.",

//         codeExample: `import { useState } from "react";

// function Contador() {
//   const [contador, setContador] = useState(0);

//   const incrementar = () => {
//     setContador((prev) => prev + 1);
//   };

//   return (
//     <div>
//       <p>Você clicou {contador} vezes</p>
//       <button onClick={incrementar}>Clique aqui</button>
//     </div>
//   );
// }
// `
//     },
//     {
//         title: "Entendendo o useEffect no React",
//         subject: "React",
//         description:
//             "`useEffect` é um hook do React usado para lidar com efeitos colaterais (side effects) em componentes funcionais. Esses efeitos são ações que ocorrem fora do fluxo principal da renderização — como buscar dados de uma API, manipular o DOM, verificar condições ou configurar timers.\n\nNo seu código do jogo da forca, o `useEffect` está sendo utilizado para verificar se o jogador **venceu** ou **perdeu** a partida. Essa verificação precisa acontecer **toda vez que o jogador fizer uma nova tentativa** (ou seja, quando `guessedLetters` mudar) ou quando o número de erros (`wrongGuesses`) aumentar. Ele também depende da palavra atual (`word`), pois, se ela mudar ao reiniciar o jogo, a lógica precisa ser reavaliada.\n\nA linha `}, [guessedLetters, wrongGuesses, word]);` é fundamental: ela define que o `useEffect` será executado **sempre que qualquer um desses três valores mudar**. Isso garante que a verificação de vitória/derrota esteja sempre atualizada, sem precisar chamá-la manualmente dentro de cada clique.\n\nEsse padrão é usado em muitos tipos de aplicação: verificações de formulário, mudanças em dados visuais (ex: gráficos), navegação automática, reações a mudanças em APIs, controle de etapas em jogos, entre outros. Com `useEffect`, você consegue conectar o estado da aplicação com comportamentos reativos de forma clara e declarativa.",

//         code: `useEffect(() => {
//   const isWinner = word.split('').every((l) => guessedLetters.includes(l));

//   if (isWinner || wrongGuesses >= 6) {
//     setGameOver(true); // Atualiza o estado se o jogador venceu ou perdeu
//   }
// }, [guessedLetters, wrongGuesses, word]); // <- Executa sempre que uma dessas variáveis mudar`,

//         descriptionExample:
//             "Veja agora um exemplo onde usamos `useEffect` para buscar dados assim que o componente aparece. Isso é extremamente comum em projetos que precisam carregar informações externas ao iniciar: produtos, posts, usuários, etc. O array vazio `[]` faz com que o efeito execute apenas uma vez, na montagem do componente, simulando um `componentDidMount` de componentes de classe.",

//         codeExample: `import { useEffect, useState } from "react";

// function ListaDeUsuarios() {
//   const [usuarios, setUsuarios] = useState([]);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => setUsuarios(data));
//   }, []); // Executa apenas uma vez ao montar o componente

//   return (
//     <ul>
//       {usuarios.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }
// `
//     },
//     {
//         title: "JSX: Misturando HTML com lógica JavaScript (Expressões JSX)",
//         subject: "React / JSX",
//         description:
//             "JSX é uma extensão de sintaxe do JavaScript usada com React que permite escrever **HTML dentro do JavaScript** — ou, de forma mais precisa, escrever **elementos React com sintaxe parecida com HTML**.Mas o verdadeiro poder do JSX está em permitir **misturar lógica JavaScript diretamente no meio do 'HTML'**. Isso inclui variáveis, funções, condicionais, laços e qualquer expressão válida de JS.\n\nPor exemplo, quando você usa algo como `{isOwner ? 'Você é o dono' : 'Acesso negado'}` dentro do JSX, você está usando **uma expressão condicional (operador ternário)** dentro do JSX. O React permite isso porque tudo que está entre `{ }` é interpretado como JavaScript. Você não pode escrever um `if` tradicional diretamente, mas pode usar ternários ou `&&`.\n\nEsse sistema permite que você crie interfaces **dinâmicas, reativas e inteligentes**, onde a exibição muda automaticamente de acordo com os dados ou estados. Isso é fundamental para SPAs (Single Page Applications), painéis, jogos, formulários, autenticação, etc.",

//         code: `return (
//   <div>
//     <h1>{isOwner ? "Bem-vindo, dono!" : "Acesso restrito"}</h1>

//     {score > 0 && <p>Você tem pontos!</p>}

//     {list.length === 0 ? (
//       <p>Nenhum item encontrado.</p>
//     ) : (
//       <ul>
//         {list.map((item) => <li key={item.id}>{item.name}</li>)}
//       </ul>
//     )}
//   </div>
// );`,

//         descriptionExample:
//             "O exemplo abaixo mostra um componente que renderiza uma saudação diferente dependendo da hora do dia. Perceba como usamos lógica condicional com ternário (`? :`) e também com `&&`, tudo dentro do JSX. Esse padrão é muito comum em apps de clima, dashboards, e-commerce, páginas com autenticação e conteúdo personalizado.",

//         codeExample: `function Saudacao({ nome }) {
//   const hora = new Date().getHours();
//   const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

//   return (
//     <div>
//       <h2>{saudacao}, {nome}!</h2>

//       {hora >= 22 && <p>Está tarde, que tal descansar?</p>}
//     </div>
//   );
// }`,
//     },
//     {
//         title: "Entendendo a cascata e especificidade no CSS",
//         subject: "CSS",
//         description:
//             "A 'cascata' no CSS é o sistema de prioridade de regras de estilo. Quando há múltiplas regras aplicáveis a um mesmo elemento, o navegador segue regras de **ordem, especificidade e origem** para decidir qual estilo aplicar. No seu CSS, por exemplo:\n\n```css\n#hangman .letters button {\n  background-color: rgb(83, 83, 83);\n}\n#hangman .letters button:disabled {\n  background-color: #444;\n}\n```\n\nAqui, mesmo que ambas as regras sejam aplicadas ao mesmo botão, o estilo `:disabled` ganha prioridade **por ser mais específico**. A pseudo-classe `:disabled` só se aplica quando o botão está realmente desativado. Isso mostra como o CSS pode se sobrepor dependendo do contexto e da condição.\n\nEntender isso é essencial em qualquer projeto: se você quer que uma regra tenha prioridade, pode aumentar sua especificidade ou colocá-la por último no arquivo. Também é por isso que `!important` existe, embora deva ser usado com moderação.",

//         code: `#hangman .letters button {
//   background-color: rgb(83, 83, 83);
// }

// #hangman .letters button:disabled {
//   background-color: #444;
//   color: #999;
// }`,
//         descriptionExample:
//             "Veja esse exemplo onde dois estilos disputam prioridade. O segundo, mais específico, vence:",
//         codeExample: `/* Regra mais genérica */
// button {
//   background-color: blue;
// }

// /* Regra mais específica */
// form button {
//   background-color: green;
// }

// /* O botão dentro do form ficará verde */`,
//     },
//     {
//         title: "Flexbox: Alinhamento e posicionamento com display: flex",
//         subject: "CSS / Flexbox",
//         description:
//             "O sistema Flexbox é uma das formas mais modernas e fáceis de alinhar e distribuir elementos no CSS. Com ele, você pode alinhar itens tanto na horizontal (`justify-content`) quanto na vertical (`align-items`) com poucas linhas.\n\nNo seu código, vários elementos usam `display: flex` para centralizar o conteúdo, como:\n\n```css\n#hangman {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n```\n\nEsse trecho centraliza o conteúdo **tanto verticalmente quanto horizontalmente** no contêiner da forca, fazendo com que o layout fique elegante em diferentes tamanhos de tela. Aprender Flexbox é fundamental para qualquer site responsivo ou interface com layout moderno, como dashboards, formulários e páginas mobile.",

//         code: `#hangman {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }`,
//         descriptionExample:
//             "No exemplo abaixo, o texto será centralizado perfeitamente dentro da página, independentemente do tamanho da janela:",
//         codeExample: `body {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// }

// h1 {
//   font-size: 2rem;
// }`,
//     },
//     {
//         title: "Estilizando estados com a pseudo-classe :disabled",
//         subject: "CSS",
//         description:
//             "A pseudo-classe `:disabled` permite estilizar elementos HTML que estão desativados. No seu jogo da forca, isso é usado para deixar os botões com aparência de bloqueados depois que são clicados ou quando o jogo termina:\n\n```css\n#hangman .letters button:disabled {\n  background-color: #444;\n  color: #999;\n  cursor: not-allowed;\n}\n```\n\nEssa técnica melhora a usabilidade e dá feedback visual ao usuário. Você pode usar `:disabled` em botões de formulário, campos de input, selects e muito mais. É muito útil para indicar que a ação está temporariamente desativada ou proibida.\n\nSaber usar pseudo-classes como `:hover`, `:focus`, `:checked` e `:disabled` é essencial em qualquer aplicação moderna, pois permite interfaces responsivas e interativas sem JavaScript.",

//         code: `button:disabled {
//   background-color: #444;
//   color: #999;
//   cursor: not-allowed;
// }`,
//         descriptionExample:
//             "Neste exemplo, o botão ficará cinza e desabilitado quando for clicado:",
//         codeExample: `<button disabled>Enviar</button>`,
//     },
//     {
//         title: "Controlando proporções com aspect-ratio",
//         subject: "CSS",
//         description:
//             "`aspect-ratio` é uma propriedade moderna do CSS que permite controlar a **proporção entre largura e altura** de um elemento, sem precisar calcular manualmente com `padding`, `width` ou `height` fixos.\n\nNo seu jogo da forca, ela é usada para garantir que os botões das letras sejam **perfeitamente quadrados**, independentemente do tamanho da tela ou do conteúdo:\n\n```css\n#hangman .letters button {\n  height: 40px;\n  aspect-ratio: 1/1;\n}\n```\n\nO valor `1/1` significa: \"a largura será igual à altura\". Isso deixa o botão sempre quadrado, mesmo que o texto dentro mude ou que o botão cresça com `font-size` ou `padding`. Essa abordagem é **muito útil** para criar cards, imagens, miniaturas, grids responsivos, botões ou qualquer coisa que precise manter uma forma proporcional.\n\nAntes do `aspect-ratio`, era comum usar *hacks* com `padding-top: 100%` para simular proporções. Agora isso ficou muito mais simples e sem gambiarras. A maioria dos navegadores modernos já suporta essa propriedade nativamente.",

//         code: `#hangman .letters button {
//   height: 40px;
//   aspect-ratio: 1 / 1;
// }`,

//         descriptionExample:
//             "Neste exemplo, criamos um grid com três cartões que sempre terão proporção de 16:9 (como uma tela widescreen). Isso é ótimo para vídeos, imagens, capas de conteúdo, etc.",

//         codeExample: `.card {
//   width: 100%;
//   aspect-ratio: 16 / 9;
//   background: #ccc;
//   border-radius: 8px;
// }

// .grid {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 1rem;
// }`,
//     }
// ]
// const skillTicTacToe = [

// {
//     title: "Gerenciamento de estado com useState",
//     subject: "React",
//     description:
//       "O hook `useState` é a base da reatividade no React. Ele permite armazenar valores que mudam ao longo do tempo e fazer com que a interface reaja automaticamente a essas mudanças.\n\nNo jogo da velha, `useState` é usado para controlar:\n- O estado do tabuleiro (`board`)\n- De quem é a vez (`xIsNext`)\n- O modo de jogo (contra bot ou 2 jogadores)\n- O vencedor (`winner`)\n\nEsses estados são atualizados com funções como `setBoard`, `setXIsNext`, etc. E sempre que um `set` é chamado, o React re-renderiza o componente com os novos valores, atualizando a interface automaticamente.\n\nIsso é essencial para qualquer app interativo: carrinhos de compras, controles de formulário, sistemas de login, dashboards, e claro, jogos como este.",

//     code: `const [board, setBoard] = useState(Array(9).fill(null));
// const [xIsNext, setXIsNext] = useState(true);
// const [mode, setMode] = useState(null);
// const [winner, setWinner] = useState(null);`,

//     descriptionExample:
//       "Veja este exemplo onde usamos `useState` para criar um contador simples. Sempre que clicamos no botão, a interface é atualizada automaticamente com o novo número:",

//     codeExample: `import { useState } from "react";

// function Contador() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>Contagem: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Somar +1</button>
//     </div>
//   );
// }`,
//   },
//   {
//     title: "Executando efeitos com useEffect",
//     subject: "React",
//     description:
//       "`useEffect` é um hook usado para executar efeitos colaterais sempre que certos dados mudam. No seu jogo, ele é usado em dois contextos:\n\n1. Para verificar se alguém venceu ou se houve empate sempre que o `board` muda:\n```js\nuseEffect(() => {\n  const win = calculateWinner(board);\n  if (win) setWinner(win);\n  else if (board.every(Boolean)) setWinner('Empate');\n}, [board]);\n```\n\n2. Para permitir que o bot jogue automaticamente quando for a vez dele:\n```js\nuseEffect(() => {\n  if (mode === 'bot' && !xIsNext && !winner) {\n    const timeout = setTimeout(botMove, 500);\n    return () => clearTimeout(timeout);\n  }\n}, [xIsNext, mode, winner]);\n```\n\nEsse uso inteligente do `useEffect` permite que o jogo reaja a mudanças de estado, sem a necessidade de verificações manuais no clique. Esse padrão é comum em requisições de API, animações, timers, ou sincronização entre componentes.",

//     code: `useEffect(() => {
//   if (mode === 'bot' && !xIsNext && !winner) {
//     const timeout = setTimeout(botMove, 500);
//     return () => clearTimeout(timeout);
//   }
// }, [xIsNext, mode, winner]);`,

//     descriptionExample:
//       "Neste exemplo, usamos `useEffect` para buscar dados de uma API apenas quando o componente for montado:",

//     codeExample: `import { useEffect, useState } from "react";

// function ListaDePosts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then(res => res.json())
//       .then(data => setPosts(data));
//   }, []); // executa uma vez ao montar

//   return (
//     <ul>
//       {posts.map(post => <li key={post.id}>{post.title}</li>)}
//     </ul>
//   );
// }`,
//   },
//   {
//     title: "Manipulação de eventos e imutabilidade do estado em React",
//     subject: "React",
//     description:
//       "Em React, lidar com eventos (como cliques) é essencial para criar interfaces interativas. No seu código, a função `handleClick` é chamada sempre que o jogador clica em uma célula do tabuleiro.\n\nAlém disso, React incentiva que o estado seja tratado de forma imutável — ou seja, você não deve modificar o estado diretamente, mas criar uma cópia dele, alterar essa cópia e então atualizar o estado com essa nova versão. Isso ajuda o React a detectar mudanças e atualizar a interface corretamente.\n\nNo código, a linha `const newBoard = [...board];` cria uma cópia do array atual do tabuleiro. Depois, essa cópia é atualizada e passada para `setBoard`. Isso evita efeitos colaterais inesperados e mantém o estado previsível.\n\nEsse padrão é fundamental em React para garantir desempenho e evitar bugs relacionados a alterações inesperadas em objetos ou arrays compartilhados.",

//     code: `function handleClick(index) {
//   if (board[index] || winner) return;

//   const newBoard = [...board];
//   newBoard[index] = xIsNext ? 'X' : 'O';
//   setBoard(newBoard);
//   setXIsNext(!xIsNext);
// }`,

//     descriptionExample:
//       "Aqui está um exemplo simples mostrando como atualizar um array no estado imutavelmente ao adicionar um novo item:",

//     codeExample: `import { useState } from "react";

// function ListaDeTarefas() {
//   const [tasks, setTasks] = useState(["Comprar pão"]);

//   function adicionarTarefa() {
//     setTasks(prevTasks => [...prevTasks, "Nova tarefa"]);
//   }

//   return (
//     <div>
//       <ul>
//         {tasks.map((task, i) => <li key={i}>{task}</li>)}
//       </ul>
//       <button onClick={adicionarTarefa}>Adicionar tarefa</button>
//     </div>
//   );
// }`,
//   },
//   {
//     title: "Representação e manipulação do tabuleiro com arrays",
//     subject: "JavaScript",
//     description:
//       "O tabuleiro do jogo da velha é representado como um array simples de 9 posições, onde cada posição pode conter 'X', 'O' ou `null` (quando está vazia). Essa estrutura linear simplifica o controle do estado do jogo.\n\nPara atualizar o tabuleiro, o código cria uma cópia do array atual (para manter a imutabilidade), modifica a posição desejada e atualiza o estado. Essa abordagem facilita a manipulação e a renderização do jogo.\n\nEsse uso de arrays para representar tabuleiros ou grades é comum em jogos, sistemas de matriz, tabuleiros digitais, e pode ser aplicado em projetos que envolvem grids, matrizes ou listas de estados.",
//     code: `const initialBoard = Array(9).fill(null);

// // Atualiza o tabuleiro de forma imutável
// const newBoard = [...board];
// newBoard[index] = xIsNext ? 'X' : 'O';`,
//     descriptionExample:
//       "Exemplo: Imagine um jogo da memória onde cada posição do array representa uma carta; você pode marcar se a carta está virada ou não com true/false.",

//     codeExample: `const cards = Array(16).fill(false); // false = carta virada para baixo
// function virarCarta(index) {
//   const newCards = [...cards];
//   newCards[index] = true; // vira a carta
//   setCards(newCards);
// }`,
//   },
//   {
//     title: "Verificando vitória no jogo da velha usando arrays e loops",
//     subject: "JavaScript",
//     description:
//       "Para verificar se algum jogador venceu, o código define um array de combinações vencedoras possíveis — linhas, colunas e diagonais — representadas por arrays de índices.\n\nEm seguida, percorre essas combinações e verifica se as posições correspondentes no tabuleiro têm o mesmo símbolo ('X' ou 'O') e não são nulas. Se encontrar uma, retorna o vencedor.\n\nEssa abordagem é eficiente, clara e fácil de adaptar para jogos que usam grades, sequências ou padrões, como Connect Four, Sudoku ou outros jogos de tabuleiro.",

//     code: `function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
//     [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
//     [0, 4, 8], [2, 4, 6],            // diagonais
//   ];

//   for (let [a, b, c] of lines) {
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }

//   return null;
// }`,
//     descriptionExample:
//       "Você pode usar lógica parecida para validar sequências em jogos de tabuleiro, como checar linhas completas em jogos de damas ou sequências no jogo da memória.",

//     codeExample: `// Verificar se três valores em um array são iguais e não nulos
// const seq = [null, 'X', 'X'];
// const isEqual = seq[0] && seq[0] === seq[1] && seq[0] === seq[2]; // false`,
//   },
//   {
//     title: "Gerando jogadas aleatórias para o bot",
//     subject: "JavaScript",
//     description:
//       "O bot no jogo da velha faz jogadas aleatórias selecionando uma posição vazia no tabuleiro.\n\nO código mapeia o tabuleiro para obter os índices que estão nulos (ou seja, livres), filtra os valores válidos, e escolhe um índice aleatório com `Math.random()`. Depois, atualiza o tabuleiro na posição escolhida.\n\nEssa técnica de gerar índices aleatórios é comum em jogos que precisam de movimentos não determinísticos, bots, simulações, ou sistemas que requerem decisões probabilísticas simples.",

//     code: `function botMove() {
//   const emptyIndices = board
//     .map((val, idx) => (val === null ? idx : null))
//     .filter(v => v !== null);

//   const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

//   const newBoard = [...board];
//   newBoard[randomIndex] = 'O';
//   setBoard(newBoard);
//   setXIsNext(true);
// }`,

//     descriptionExample:
//       "Exemplo simples para escolher um número aleatório dentro de um conjunto de opções válidas em jogos ou sorteios.",

//     codeExample: `const options = ['pedra', 'papel', 'tesoura'];
// const choice = options[Math.floor(Math.random() * options.length)];
// console.log('Escolha do bot:', choice);`,
//   },
//   {
//     title: "Layout com Flexbox e Grid para interfaces responsivas",
//     subject: "CSS",
//     description:
//       "Seu CSS usa tanto Flexbox quanto Grid, duas das ferramentas mais poderosas para criar layouts modernos e responsivos.\n\nO contêiner principal `.tic_tac_toe` usa Flexbox para alinhar o conteúdo vertical e horizontalmente ao centro:\n\n```css\n.tic_tac_toe {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n```\n\nJá o tabuleiro `.board` é criado com Grid, definindo uma grade de 3 colunas de 100px, espaçadas por 5px:\n\n```css\n.tic_tac_toe .board {\n  display: grid;\n  grid-template-columns: repeat(3, 100px);\n  gap: 5px;\n}\n```\n\nFlexbox é ideal para layouts lineares (em linha ou coluna), enquanto Grid é perfeito para grades bidimensionais — como o tabuleiro do jogo. Saber combinar esses dois te dá muito controle sobre a interface, desde simples menus até complexos dashboards ou jogos.",

//     code: `.tic_tac_toe {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// }

// .tic_tac_toe .board {
//   display: grid;
//   grid-template-columns: repeat(3, 100px);
//   gap: 5px;
// }`,

//     descriptionExample:
//       "Exemplo: usando Flexbox para centralizar um texto e Grid para organizar itens em 4 colunas responsivas:",

//     codeExample: `/* Flexbox para centralizar */
// .container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 200px;
// }

// /* Grid para 4 colunas */
// .grid {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 10px;
// }`,
//   },
//   {
//     title: "Estilização de botões e células com efeitos visuais e usabilidade",
//     subject: "CSS",
//     description:
//       "Seu CSS estiliza as células do tabuleiro e os botões para criar uma experiência visual clara e responsiva.\n\nAs células `.cell` usam:\n- `display: flex` com `align-items` e `justify-content` para centralizar o X ou O\n- `transition` para suavizar a mudança de cor no hover\n- `cursor: pointer` para indicar interatividade\n- `border-radius` para cantos arredondados\n\nOs botões também usam hover para dar feedback visual, mudando a cor de fundo, o que é importante para a usabilidade.\n\nEsses detalhes fazem com que o usuário tenha uma experiência agradável e intuitiva, algo fundamental em interfaces modernas.",

//     code: `.tic_tac_toe .cell {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: background 0.3s;
//   border-radius: 10px;
// }

// .tic_tac_toe .cell:hover {
//   background: #4b4b4b;
// }

// .tic_tac_toe button {
//   cursor: pointer;
//   transition: background 0.3s;
// }

// .tic_tac_toe button:hover {
//   background: #555;
// }`,

//     descriptionExample:
//       "Exemplo: um botão com transição suave que muda de cor ao passar o mouse, melhorando a experiência do usuário:",

//     codeExample: `button {
//   background-color: #222;
//   color: white;
//   padding: 12px 24px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
// }

// button:hover {
//   background-color: #555;
// }`,
//   }
// ]
// const skillMemoryGame= [
//     {
//     title: "Gerenciamento de múltiplos estados locais",
//     subject: "React",
//     description:
//       "Em componentes React, é comum a necessidade de armazenar diferentes tipos de informações que controlam aspectos variados da interface e da lógica da aplicação. Para isso, utilizam-se múltiplos estados locais, cada um responsável por uma parte específica do comportamento do componente.\n\nNo exemplo do jogo da memória, há estados distintos para controlar a carta selecionada na primeira e segunda jogada, o bloqueio do tabuleiro enquanto se verifica uma combinação, o conjunto completo de cartas com suas propriedades individuais, e o estado de vitória.\n\nEsta abordagem de dividir o estado em variáveis específicas promove melhor organização, facilita o entendimento do código e reduz a complexidade das atualizações de estado.",
//     code: `const [firstCard, setFirstCard] = useState(null);
// const [secondCard, setSecondCard] = useState(null);
// const [lockBoard, setLockBoard] = useState(false);
// const [cards, setCards] = useState([...]);
// const [won, setWon] = useState(false);`,
//     descriptionExample:
//       "Exemplo de uso de múltiplos estados locais em um formulário com campos separados:",

//     codeExample: `const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");`,
//   },
//   {
//     title: "Atualização imutável de arrays no estado",
//     subject: "React",
//     description:
//       "No React, o estado deve ser tratado como imutável, ou seja, não se deve modificar diretamente os dados armazenados no estado. Isso porque o React depende da detecção dessas mudanças para atualizar a interface de forma eficiente.\n\nQuando se trabalha com arrays, a atualização imutável consiste em criar uma nova cópia do array original com as alterações desejadas, em vez de modificar o array diretamente. Essa prática evita efeitos colaterais inesperados e mantém a previsibilidade do estado.\n\nNo código fornecido, a atualização das cartas utiliza o método `.map()` para gerar um novo array, modificando apenas os objetos que correspondem às cartas selecionadas, preservando os demais intactos.",
//     code: `setCards(prev =>
//   prev.map(card =>
//     card.id === firstCard.id || card.id === secondCard.id
//       ? { ...card, flipped: false }
//       : card
//   )
// );`,
//     descriptionExample:
//       "Exemplo simples de atualização imutável em uma lista de tarefas, marcando uma tarefa como concluída:",

//     codeExample: `const tasks = [
//   { id: 1, text: "Comprar pão", done: false },
//   { id: 2, text: "Estudar React", done: false },
// ];

// const updatedTasks = tasks.map(task =>
//   task.id === 2 ? { ...task, done: true } : task
// );`,
//   },
//   {
//     title: "Operador de Comparação Estrita (===)",
//     subject: "JavaScript",
//     description:
//       "O operador `===` é utilizado para realizar uma comparação estrita entre dois valores. Diferente do operador `==`, ele verifica se os valores são iguais **e também se são do mesmo tipo**. Isso evita resultados inesperados causados por coerções automáticas de tipo.\n\nNo código do jogo da memória, ele é usado para verificar se duas cartas possuem a **mesma imagem associada**, o que caracteriza um par correto. Esse tipo de verificação é crucial para garantir que a lógica do jogo só considere como par verdadeiro quando as imagens forem **exatamente iguais**, tanto em valor quanto em tipo (string).",
//     code: `if (firstCard.img === secondCard.img) {
//   setCards(prev =>
//     prev.map(card =>
//       card.img === firstCard.img
//         ? { ...card, matched: true }
//         : card
//     )
//   );
//   resetTurn();
// }`,
//     descriptionExample:
//       "Este operador é fundamental para situações que exigem validação precisa, como identificar se duas seleções são idênticas em jogos de lógica.",
//     codeExample: `if (usuario.id === registro.id) {
//   console.log("IDs conferem, acesso permitido.");
// }`,
//   },
//   {
//     title: "Classe Math",
//     subject: "JavaScript",
//     description:
//       "A classe `Math` é um utilitário interno do JavaScript que oferece métodos matemáticos prontos para uso. Uma de suas funções mais comuns é `Math.random()`, que gera um número decimal aleatório entre 0 e 1. Esse número pode ser ajustado para atender a diversas necessidades, como selecionar um índice aleatório. No código do jogo da memória, ela é usada no embaralhamento de cartas, garantindo que cada partida tenha uma ordem diferente.",
//     code: `const shuffledImages = [...images, ...images].sort(() => 0.5 - Math.random());`,
//     descriptionExample:
//       "`Math.random()` é frequentemente usada para gerar sorteios, embaralhar cartas ou posicionar elementos aleatoriamente em jogos.",
//     codeExample: `const numero = Math.floor(Math.random() * 6) + 1;
// console.log("Você rolou um dado e tirou:", numero);`,
//   },
//   {
//     title: "O método .map aplicado em arrays de objetos",
//     subject: "JavaScript",
//     description:
//       "O método `.map()` é utilizado para transformar os itens de um array, criando um novo array com os resultados da função aplicada a cada elemento. No jogo da memória, é usado para atualizar as propriedades de cada carta, como quando se deseja marcar cartas como viradas ou combinadas, preservando as demais inalteradas. Essa abordagem mantém o princípio da imutabilidade, essencial no React.",
//     code: `const updatedCards = cards.map(c =>
//   c.id === card.id ? { ...c, flipped: true } : c
// );`,
//     descriptionExample:
//       "Muito utilizado em interfaces para transformar dados brutos em elementos visuais, mantendo o controle sobre a origem dos dados.",
//     codeExample: `const usuarios = lista.map(u => ({
//   nome: u.nome.toUpperCase(),
//   ativo: true
// }));`,
//   },
//   {
//     title: "Estrutura condicional if com múltiplas restrições",
//     subject: "JavaScript",
//     description:
//       "A estrutura `if` permite definir condições para execução de trechos de código. No jogo da memória, ela é utilizada para impedir ações inválidas, como virar cartas já viradas ou interagir enquanto o tabuleiro está bloqueado. A combinação de condições com operadores lógicos torna o controle do fluxo de jogo mais preciso e seguro.",
//     code: `if (lockBoard || card.flipped || card.matched) return;`,
//     descriptionExample:
//       "É comum usar múltiplas condições para validar ações do usuário e prevenir erros de execução em jogos e interfaces dinâmicas.",
//     codeExample: `if (!email || !senha || bloqueado) {
//   alert("Preencha os campos corretamente.");
//   return;
// }`,
//   }
// ]

// const skillPingPong = [
//     {
//   title: "Movimento com setInterval",
//   subject: "JavaScript",
//   description:
//     "`setInterval` permite executar uma função repetidamente em um intervalo fixo de tempo. No jogo, ele atualiza a lógica de movimento da bola e da raquete inimiga a cada 16 milissegundos (aproximadamente 60 quadros por segundo), criando um efeito contínuo de animação.",
//   code: `const interval = setInterval(() => {
//   // lógica de colisão e movimento
// }, 1000 / 60);`,
//   descriptionExample:
//     "Essencial para animações, jogos ou tarefas que precisam acontecer repetidamente com precisão.",
//   codeExample: `setInterval(() => {
//   console.log("Rodando...");
// }, 1000);`,
// },
// {
//   title: "Aleatoriedade com Math.random",
//   subject: "JavaScript",
//   description:
//     "`Math.random()` retorna um número aleatório entre 0 e 1. No seu jogo, ele define a direção inicial da bola de forma imprevisível, deixando cada partida diferente da outra.",
//   code: `dx: Math.random() > 0.5 ? 4 : -4,`,
//   descriptionExample:
//     "Muito utilizado em jogos para gerar movimentos aleatórios, desafios dinâmicos e sorteios.",
//   codeExample: `const direcao = Math.random() > 0.5 ? "esquerda" : "direita";`,
// },
// {
//   title: "Atualização de pontuação",
//   subject: "JavaScript",
//   description:
//     "A função de atualização da pontuação é feita com `setState(prev => ...)`, que garante que o valor anterior seja usado corretamente. Isso é necessário porque a atualização de estado pode ser assíncrona em React.",
//   code: `setPlayerScore((prev) => {
//   const newScore = prev + 1;
//   if (newScore >= WIN_SCORE) {
//     setMessage("Você Ganhou!");
//     restart();
//   }
//   return newScore;
// });`,
//   descriptionExample:
//     "Essencial em situações onde múltiplas atualizações dependem do valor atual do estado.",
//   codeExample: `setValorAtual(v => v + 1);`,
// },
// {
//   title: "Armazenando valores com useRef",
//   subject: "React",
//   description:
//     "`useRef` é um hook do React que armazena valores mutáveis sem causar re-renderização. No jogo, ele é usado para manter as posições da bola e das raquetes em tempo real, garantindo performance e controle fino sem travamentos.",
//   code: `const ballRef = useRef({ x: WIDTH / 2, y: HEIGHT / 2, dx: 4, dy: 4 });`,
//   descriptionExample:
//     "Muito útil em jogos, timers e elementos DOM que precisam de acesso direto sem re-renderizações constantes.",
//   codeExample: `const posicao = useRef(0);`,
// },
// {
//   title: "Efeitos com useEffect",
//   subject: "React",
//   description:
//     "`useEffect` é usado para lidar com efeitos colaterais, como adicionar ouvintes de eventos, lidar com timers ou responder a mudanças. No jogo, ele controla o loop do jogo com `setInterval` e o movimento do mouse com `addEventListener`.",
//   code: `useEffect(() => {
//   window.addEventListener("mousemove", handleMouseMove);
//   return () => window.removeEventListener("mousemove", handleMouseMove);
// }, []);`,
//   descriptionExample:
//     "É indispensável quando queremos realizar ações fora do fluxo de renderização normal.",
//   codeExample: `useEffect(() => {
//   const id = setInterval(() => {}, 1000);
//   return () => clearInterval(id);
// }, []);`,
// },
// {
//   title: "Estados com useState",
//   subject: "React",
//   description:
//     "`useState` permite criar variáveis reativas. No jogo, ele controla o placar, a mensagem de vitória/derrota, o andamento da partida e força re-renderizações quando necessário.",
//   code: `const [playerScore, setPlayerScore] = useState(0);`,
//   descriptionExample:
//     "Essencial em qualquer aplicação interativa, desde jogos até formulários e sistemas dinâmicos.",
//   codeExample: `const [clicado, setClicado] = useState(false);`,
// }
// ]

// export {skillMemoryGame,skillPingPong,skillTicTacToe,skillsHangman}