
import React, { useState, useEffect } from 'react';
import './tic_tac_toe.css';
import { GameNavTop } from "../../../components/game_nav_top/game_nav_top"

const initialBoard = Array(9).fill(null);

export function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState(null); // null, 'bot', 'pvp'
  const [winner, setWinner] = useState(null);

  // Verifica se alguém venceu ou empatou
  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
    } else if (board.every(Boolean)) {
      setWinner('Empate');
    }
  }, [board]);

  // Bot joga automaticamente
  useEffect(() => {
    if (mode === 'bot' && !xIsNext && !winner) {
      const timeout = setTimeout(() => {
        botMove();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, mode, winner]);

  function handleClick(index) {
    if (board[index] || winner) return;
    if (mode === 'bot' && !xIsNext) return; // Impede jogador de jogar como O no modo bot

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function botMove() {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);
    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
    setXIsNext(true);
  }

  function resetGame() {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  }

  if (!mode) {
    return (
      <div className="tic_tac_toe">
        <GameNavTop
       gameName={"Jogo da velha"}/>
        <h1>Tic Tac Toe</h1>
        <p>Escolha o modo de jogo:</p>
        <div className="mode-buttons">
          <button onClick={() => setMode('pvp')}>2 Jogadores</button>
          <button onClick={() => setMode('bot')}>1 Jogador (vs Bot)</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tic_tac_toe">
       <GameNavTop
       gameName={"Jogo da velha"}/>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, i) => (
          <div key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>

      <div className="status">
        {winner ? (
          winner === 'Empate' ? (
            '😐 Empate!'
          ) : (
            `🏆 Vencedor: ${winner}`
          )
        ) : (
          `Vez de: ${xIsNext ? 'X' : 'O'}`
        )}
      </div>

      <div className="buttons">
        <button onClick={resetGame}>Reiniciar</button>
        <button onClick={() => {
          setMode(null);
          resetGame();
        }}>
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}