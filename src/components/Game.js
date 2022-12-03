import './Game.css'

const Game = ({verifyLetter}) => {
  return (
    <div>
      <h3>Iniciar game</h3>
      <button onClick={verifyLetter}>fim</button>
    </div>
  )
}

export default Game