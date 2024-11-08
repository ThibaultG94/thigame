import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Pages temporaires pour les jeux (on peut les développer plus tard)
const Memory = () => <h1 className="text-3xl font-bold">Memory Plus</h1>;
const SpeedMatch = () => <h1 className="text-3xl font-bold">Speed Match</h1>;
const Puzzle = () => <h1 className="text-3xl font-bold">Puzzle Quest</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/memory" element={<Memory />} />
        <Route path="/games/speed-match" element={<SpeedMatch />} />
        <Route path="/games/puzzle" element={<Puzzle />} />
      </Routes>
    </Router>
  );
}

export default App;