import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme';
import Home from './pages/Home';
import Games from './pages/Games';
import MemoryPlus from './games/memory-plus';

// Pages temporaires pour les jeux (on peut les développer plus tard)
const SpeedMatch = () => <h1 className="text-3xl font-bold">Speed Match</h1>;
const Puzzle = () => <h1 className="text-3xl font-bold">Puzzle Quest</h1>;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/memory" element={<MemoryPlus />} />
          <Route path="/games/speed-match" element={<SpeedMatch />} />
          <Route path="/games/puzzle" element={<Puzzle />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;