import React, { useState, useEffect } from 'react';
import cardsInfo from './assets/cardsInfo';
import Card from './components/Card';
import './styles/Main.scss';
import './App.css';
import uuid from 'react-uuid';

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    setCards(
      [...cardsInfo, ...cardsInfo]
        .map((card) => {
          return { ...card, id: uuid() };
        })
        .sort(() => Math.random() - 0.5)
    );
  }, []);

  function toggleSelected(id) {
    setCards((prev) => {
      return prev.map((card) => {
        if (id === card.id) {
          return {
            ...card,
            selected: !card.selected,
          };
        } else {
          return card;
        }
      });
    });
  }

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

  return (
    <div className='App'>
      Card Flip Game
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
