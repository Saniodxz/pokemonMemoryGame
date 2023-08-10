import React from 'react';
import './Card.css';

const Card = ({ data, onClick }) => {
  const handleCardClick = () => {
    onClick(data.name);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.url.split('/')[6]}.png`} alt={data.name} />
      <p>{data.name}</p>
    </div>
  );
};

export default Card;
