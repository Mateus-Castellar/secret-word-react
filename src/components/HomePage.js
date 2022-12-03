import './HomePage.css'

const HomePage = ({startGame}) => {
  return (
    <div className="home">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default HomePage