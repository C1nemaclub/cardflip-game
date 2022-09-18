import React from 'react';
import cardBack from '../assets/images/cardback.png';

export default function Card(props) {
  const cardElement = props.cards.map((card) => {
    const isShowing = {
      transform:
        props.choiceOne === card || props.choiceTwo === card || card.match
          ? 'rotateY(180deg)'
          : 'rotateY(0deg)',
    };

    const frontStyle = {
      backgroundImage: `url(${card.image})`,
    };
    const backStyle = {
      backgroundImage: `url(${cardBack})`,
    };

    return (
      <div
        key={card.id}
        style={isShowing}
        className='card'
        onClick={() => props.toggleSelected(card)}
      >
        <div className='front' style={frontStyle}></div>
        <div className='back' style={backStyle}></div>

        {/* <img src={card.image} alt='' /> */}
      </div>
    );
  });

  return <>{cardElement}</>;
}
