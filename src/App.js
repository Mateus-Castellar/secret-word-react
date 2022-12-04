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
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"},
]

function App() {
  
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const[pickedWord, setPickedWord] = useState("");
  const[pickedCategory, setPickedCategory] = useState("");
  const[letters, setletters] = useState([]);

  const[guessedLetters,setGuessedLetters] = useState([]);
  const[wrongLetters,setWrongdLetters] = useState([]);
  const[guesses,setGuesses] = useState(3);
  const[score,setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    
    //selecionando categoria aleatoriamente
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //selecionando palavra da categoria aleatoriamentes
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word};
  },[words]);

  const startGame = useCallback(() => {

    clearLetterStates();
    
    //selecionar palavra e categoria
    const {category, word} = pickWordAndCategory();

    //pegar a palavar e transforma-la em um array de letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setletters(wordLetters);

    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  //processar entrada de letra(input)
  const verifyLetter = (letter) => {

    const normalizeLetter = letter.toLowerCase();
    
    //verificar se a letra ja foi usado
    if(guessedLetters.includes(normalizeLetter) ||wrongLetters.includes(normalizeLetter)){
      return;
    }

    if(letters.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetter) => [
        ...actualGuessedLetter, letter
      ])
    }
    else{
      setWrongdLetters((actualWrongLetter) => [
        ...actualWrongLetter, normalizeLetter])
        
      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };

  const retryGame= () =>{
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  }

  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongdLetters([]);
  };

  //monitora um dado (game over)
  useEffect(() => {

    if(guesses === 0){
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  },[guesses])

  //monitora vitoria
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]; //obtem um array de itens(letras) unicas

    //evitar somar pontos ao carregar componente (comparando zero com zero)
    if(guessedLetters.length === 0 && uniqueLetters.length ===0) return;

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => (actualScore += 100));
      console.log("passei aqui dentro" + guessedLetters.length + uniqueLetters.length);

      //resetar jogo e selecionar nova palavra
      startGame();
    }
  
  }, [guessedLetters,letters,startGame]); 

  return (
    <div className="App">
      {gameStage === 'start' && <HomePage startGame={startGame}/>}      

      {gameStage === 'game' && (<Game verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters}
      guessedLetter={guessedLetters}
      wrongLetter={wrongLetters}
      guesses={guesses}
      score={score}/>)}      
      
      {gameStage === 'end' && <GameOver retryGame={retryGame} score={score}/>}      
    </div>
  );
}

export default App;
