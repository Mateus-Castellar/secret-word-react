//css
import './App.css';

//react
import { useCallback, useEffect, useState} from 'react';

//dados
import {wordsList} from './data/words';

//componentes
import HomePage from './components/HomePage';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1,name:"start"},
  {id:2,name:"game"},
  {id:3,name:"end"},
]

function App() {
  
  const [gameStages, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const startGame = () => {
    setGameStage(stages[1].name);
  }

  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retryGame= () =>{
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStages === 'start' && <HomePage startGame={startGame}/>}      
      {gameStages === 'game' && <Game verifyLetter={verifyLetter}/>}      
      {gameStages === 'end' && <GameOver retryGame={retryGame}/>}      
    </div>
  );
}

export default App;
