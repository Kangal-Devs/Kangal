import { use, useCallback, useEffect, useState } from "react"
import "./hangman.css"
import { GameNavTop } from "../../../components/game_nav_top/game_nav_top"

import stage1 from "../../../../assets/specific_page/all_games/hangman/stage1.png"
import stage2 from "../../../../assets/specific_page/all_games/hangman/stage2.png"
import stage3 from "../../../../assets/specific_page/all_games/hangman/stage3.png"
import stage4 from "../../../../assets/specific_page/all_games/hangman/stage4.png"
import stage5 from "../../../../assets/specific_page/all_games/hangman/stage5.png"
import stage6 from "../../../../assets/specific_page/all_games/hangman/stage6.png"
import stage7 from "../../../../assets/specific_page/all_games/hangman/stage7.png"

const words = ['iorgute'
    ,'engravatar'
    ,'girassol'
    ,'caderno'
    ,'janela'
    ,'cachorro'
    ,'franja'
    ,'garganta'
    ,'forca'
    ,'suspiro'
    ,'fragmento'
    ,'calculadora'
    ,'jantar'
    ,"segredo"
    ,"asfalto"
    ,"frigideira",
    ,"relampago"
    ];

const images = [
  stage1,
   stage2,
 stage3,
  stage4,
 stage5,
  stage6,
  stage7,
];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export function Hangman() {
  const [word, setWord] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) return;
    setGuessedLetters((prev) => [...prev, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const isWinner = word.split('').every((l) => guessedLetters.includes(l));
    if (isWinner || wrongGuesses >= 6) {
      setGameOver(true);
    }
  }, [guessedLetters, wrongGuesses, word]);

  const resetGame = () => {
    setWord(getRandomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
  };

  const renderWord = () =>
    word.split('').map((letter, i) => (
      <span key={i} className="letter">
        {guessedLetters.includes(letter) || gameOver ? letter : '_'}
      </span>
    ));

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div id="hangman">
      <GameNavTop
      gameName={"Jogo da forca"}/>
      <div id="hangman_principal">
      <img src={images[wrongGuesses]} alt="forca" className="image" />
      <div className="word">{renderWord()}</div>
      <div className="letters">
        {letters.map((letter) => (
          <button
            key={letter}
            disabled={guessedLetters.includes(letter) || gameOver}
            onClick={() => handleGuess(letter)}>
            {letter}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="result">
          <h2>{wrongGuesses >= 6 ? 'Você perdeu!' : 'Você venceu!'}</h2>
          <button onClick={resetGame}>Jogar Novamente</button>
        </div>
      )}</div>
    </div>
  );
}
