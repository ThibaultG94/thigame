import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme';
import Home from './pages/Home';
import Games from './pages/Games';

// Pages temporaires pour les jeux (on peut les développer plus tard)
const Memory = () => <h1 className="text-3xl font-bold">Memory Plus</h1>;
const SpeedMatch = () => <h1 className="text-3xl font-bold">Speed Match</h1>;
const Puzzle = () => <h1 className="text-3xl font-bold">Puzzle Quest</h1>;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/memory" element={<Memory />} />
          <Route path="/games/speed-match" element={<SpeedMatch />} />
          <Route path="/games/puzzle" element={<Puzzle />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;