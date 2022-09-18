import React, { useState, useEffect } from 'react';
import cardsInfo from './assets/cardsInfo';
import Card from './components/Card';
import './styles/Main.scss';
import './App.css';
import uuid from 'react-uuid';
import { useStopwatch } from 'react-timer-hook';

function App() {
  const { seconds, minutes, start, pause, reset } = useStopwatch({});
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [mainScreen, setMainScreen] = useState(true);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setCards(
      [...cardsInfo, ...cardsInfo]
        .map((card) => {
          return { ...card, id: uuid() };
        })
        .sort(() => Math.random() - 0.5)
    );
  }, []);

  let allMatch;
  useEffect(() => {
    allMatch = cards.every((card) => card.match);
    setWin(allMatch);
  }, [cards]);

  useEffect(() => {
    if (win) {
      pause();
    }
  }, [win]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.name === choiceTwo.name && choiceTwo.id !== choiceOne.id) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.name === choiceOne.name) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        resetChoices();
      } else {
        resetChoices();
      }
    }
  }, [choiceOne, choiceTwo]);

  function resetChoices() {
    setTimeout(() => {
      setChoiceTwo(null);
      setChoiceOne(null);
    }, 500);
  }

  function makeChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  function resetGame() {
    setChoiceTwo(null);
    setChoiceOne(null);
    setWin(false);
    reset();
    setCards((prev) => {
      return prev.map((card) => {
        return { ...card, match: false };
      });
    });
    setTimeout(() => {
      setCards((prev) => {
        return prev.sort(() => Math.random() - 0.5);
      });
    }, 500);
  }

  return (
    <div className='App'>
      <div className='timer' onClick={pause}>
        {seconds <= 9 ? minutes + ':' + '0' + seconds : minutes + ':' + seconds}
      </div>
      {win && (
        <div className='win'>
          <h2>You Won!</h2>
          <div className='time' onClick={pause}>
            {seconds <= 9
              ? minutes + ':' + '0' + seconds
              : minutes + ':' + seconds}
          </div>
          <button onClick={resetGame}>Play Again!</button>
        </div>
      )}
      {mainScreen && (
        <div className='mainScreen'>
          <button
            onClick={() => {
              setMainScreen(false);
              start();
            }}
          >
            Start Game
          </button>
        </div>
      )}
      <div className='card-grid'>
        <Card
          cards={cards}
          toggleSelected={makeChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
        />
      </div>
    </div>
  );
}
export default App;
