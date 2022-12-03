import './GameOver.css'

const GameOver = ({retryGame}) => {
  return (
    <div>
      <h3>game over</h3>
      <button onClick={retryGame}>tentar novamente</button>
    </div>
  )
}

export default GameOver