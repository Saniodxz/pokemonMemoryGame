import React, { useState, useEffect } from 'react';
import Card from './components/Card.jsx';
import Scoreboard from './components/Scoreboard.jsx';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
      .then(response => response.json())
      .then(data => setPokemonData(data.results));
  }, []);

  const shuffleCards = array => {
    let currentIndex = array.length, randomIndex, tempValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  };

  const handleCardClick = cardName => {
    if (clickedCards.includes(cardName)) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedCards([]);
    } else {
      setScore(score + 1);
      setClickedCards([...clickedCards, cardName]);
    }
    setPokemonData(shuffleCards([...pokemonData]));
  };

  return (
    <div className="App">
      <h1>Pokemon Memory Card Game</h1>
      <div className="instructions">
        <p>Click on a Pokemon card to reveal it. Click on different Pokemon cards to score points. But don't click on the same Pokemon card twice!</p>
      </div>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-container">
        {pokemonData.map(pokemon => (
          <Card key={pokemon.name} data={pokemon} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
