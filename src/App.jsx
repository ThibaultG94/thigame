import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';

// Pages temporaires pour test
const Home = () => <h1 className="text-3xl font-bold">Accueil</h1>;
const Games = () => <h1 className="text-3xl font-bold">Jeux</h1>;
const Leaderboard = () => <h1 className="text-3xl font-bold">Classements</h1>;
const Profile = () => <h1 className="text-3xl font-bold">Profil</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;