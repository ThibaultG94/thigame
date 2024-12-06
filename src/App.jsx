import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme";
import Home from "./pages/Home";
import Games from "./pages/Games";
import MemoryPlus from "./games/memory-plus";
import RootLayout from "./components/layout/RootLayout";

// Pages temporaires pour les jeux (on peut les développer plus tard)
const SpeedMatch = () => <h1 className="text-3xl font-bold">Speed Match</h1>;
const Puzzle = () => <h1 className="text-3xl font-bold">Puzzle Quest</h1>;
const Leaderboard = () => <h1 className="text-3xl font-bold">Leaderboard</h1>;
const About = () => <h1 className="text-3xl font-bold">À propos</h1>;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/memory" element={<MemoryPlus />} />
            <Route path="/games/speed-match" element={<SpeedMatch />} />
            <Route path="/games/puzzle" element={<Puzzle />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
