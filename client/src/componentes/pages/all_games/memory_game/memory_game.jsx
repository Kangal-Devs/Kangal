import React, { useEffect, useState } from "react";
import brazil from "../../../../assets/specific_page/all_games/memory_game/brazil.png"
import bolivia from "../../../../assets/specific_page/all_games/memory_game/bolivia.png"
import japan from "../../../../assets/specific_page/all_games/memory_game/japan.png"
import mexico from "../../../../assets/specific_page/all_games/memory_game/mexico.png"
import russia from "../../../../assets/specific_page/all_games/memory_game/russia.png"
import china from "../../../../assets/specific_page/all_games/memory_game/china.png"
import usa from "../../../../assets/specific_page/all_games/memory_game/usa.png"
import uk from "../../../../assets/specific_page/all_games/memory_game/uk.png"
import peru from "../../../../assets/specific_page/all_games/memory_game/peru.png"
import germany from "../../../../assets/specific_page/all_games/memory_game/germany.png"
import nigeria from "../../../../assets/specific_page/all_games/memory_game/nigeria.png"
import back from "../../../../assets/specific_page/all_games/memory_game/back.png"
import "./memory_game.css";
import { GameNavTop } from "../../../components/game_nav_top/game_nav_top"

const images = [
  brazil,peru,bolivia,japan,china,usa,russia,nigeria,germany,uk,mexico
]
const shuffledImages = [...images, ...images].sort(() => 0.5 - Math.random());

export function MemoryGame() {
  const [cards, setCards] = useState(
    shuffledImages.map((img, index) => ({
      id: index,
      img,
      flipped: false,
      matched: false,
    }))
  );

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (firstCard && secondCard) {
      setLockBoard(true);
      if (firstCard.img === secondCard.img) {
        setCards(prev =>
          prev.map(card =>
            card.img === firstCard.img
              ? { ...card, matched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [secondCard]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  const handleClick = (card) => {
    if (lockBoard || card.flipped || card.matched) return;

    const updatedCards = cards.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  return (
    <div className="memory-game">
         <GameNavTop
         gameName={"Jogo da memória"}/>
        <h1> JOGO DA MEMÓRIA</h1>
        <h2>Países</h2>
      <div className="card-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
            onClick={() => handleClick(card)}
          >
            <div className="front"><img src={card.img}/></div>
            <div className="back"><img src={back}/></div>
          </div>
        ))}
      </div>
      {won && <div className="won-message">🎉 Você Ganhou! 🎉</div>}
    </div>
  );
}
