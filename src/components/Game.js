import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetter,
  wrongLetter,
  guesses,
  score}) => {

    const[letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (event) =>{
      event.preventDefault();

      verifyLetter(letter);
      
      setLetter("");
      letterInputRef.current.focus();
    }
  
    return (
    <div className='game'> 
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>

      <h1>Advinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Você ainda tem {guesses} tentativa(s)..</p>

      <div className="wordContainer">
        {letters.map((letter,i) => (
          guessedLetter.includes(letter) ?
          (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))} 
        
      </div>

      <div className="letterContainer">
        <p>tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input ref={letterInputRef} type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter}/>
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetter.map((letter,i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game