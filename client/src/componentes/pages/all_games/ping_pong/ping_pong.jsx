import React, { useEffect, useRef, useState } from "react";
import "./ping_pong.css";
import { GameNavTop } from "../../../components/game_nav_top/game_nav_top"

const WIDTH = 800;
const HEIGHT = 500;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 12;
const WIN_SCORE = 5;

export function PingPong() {
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [message, setMessage] = useState("");
  const [gameRunning, setGameRunning] = useState(true);
  const [tick, setTick] = useState(0);

  const ballRef = useRef({ x: WIDTH / 2, y: HEIGHT / 2, dx: 4, dy: 4 });
  const playerY = useRef(HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const enemyY = useRef(HEIGHT / 2 - PADDLE_HEIGHT / 2);

  const gameRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = gameRef.current.getBoundingClientRect();
      playerY.current = e.clientY - rect.top - PADDLE_HEIGHT / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      if (!gameRunning) return;

      const ball = ballRef.current;
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.y <= 0 || ball.y + BALL_SIZE >= HEIGHT) ball.dy *= -1;

      if (ball.y < enemyY.current + PADDLE_HEIGHT / 2) enemyY.current -= 3;
      if (ball.y > enemyY.current + PADDLE_HEIGHT / 2) enemyY.current += 3;

      if (
        ball.x <= PADDLE_WIDTH &&
        ball.y + BALL_SIZE >= playerY.current &&
        ball.y <= playerY.current + PADDLE_HEIGHT
      ) {
        ball.dx *= -1;
        ball.x = PADDLE_WIDTH;
      }

      if (
        ball.x + BALL_SIZE >= WIDTH - PADDLE_WIDTH &&
        ball.y + BALL_SIZE >= enemyY.current &&
        ball.y <= enemyY.current + PADDLE_HEIGHT
      ) {
        ball.dx *= -1;
        ball.x = WIDTH - PADDLE_WIDTH - BALL_SIZE;
      }

      if (ball.x < 0) {
        setEnemyScore((prev) => {
          const newScore = prev + 1;
          if (newScore >= WIN_SCORE) {
            setMessage("Você Perdeu!");
            restart();
          }
          return newScore;
        });
        resetBall();
      }

      if (ball.x > WIDTH) {
        setPlayerScore((prev) => {
          const newScore = prev + 1;
          if (newScore >= WIN_SCORE) {
            setMessage("Você Ganhou!");
            restart();
          }
          return newScore;
        });
        resetBall();
      }

      setTick((prev) => prev + 1);
    }, 1000 / 60);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [gameRunning]);

  const resetBall = () => {
    ballRef.current = {
      x: WIDTH / 2,
      y: HEIGHT / 2,
      dx: Math.random() > 0.5 ? 4 : -4,
      dy: Math.random() > 0.5 ? 4 : -4,
    };
  };

  const restart = () => {
    setGameRunning(false);
    setTimeout(() => {
      setPlayerScore(0);
      setEnemyScore(0);
      setMessage("");
      setGameRunning(true);
      resetBall();
    }, 2000);
  };

  return (
    <div className="site-background">
       <GameNavTop
       gameName={"Ping Pong"}/>
      <div className="game-container" ref={gameRef}>
        <div className="paddle player" style={{ top: playerY.current }} />
        <div className="paddle enemy" style={{ top: enemyY.current }} />

        <div
          className="ball"
          style={{ top: ballRef.current.y, left: ballRef.current.x }}
        />

        <div className="score">
          {playerScore} x {enemyScore}
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}