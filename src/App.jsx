import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './home'
import Game from './game'
import History from './History'
// import GameHistory from './GameHistory'
//  import { Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        {/* <nav>
          <ul className="nav-links">
            <li><Link to="/">Play Game</Link></li>
            <li><Link to="/history">View History</Link></li>
          </ul>
        </nav> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
