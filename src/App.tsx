import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Game from "./components/Game";
import ChallengeModal from "./components/ChallengeModal";
import { getUserProfile } from "./api";
import type { User } from "./types";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [challenger, setChallenger] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user profile if logged in
      getUserProfile().then((data) => setUser(data));
    }

    // Check for challenger ID in query params
    const params = new URLSearchParams(location.search);
    const challengerId = params.get("challenger");
    if (challengerId) {
      getUserProfile(challengerId).then((data) => setChallenger(data));
    }
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="App">
      {user && (
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <span>{user.username}</span>
          <span style={{ marginLeft: 10 }}>Score: {user.score}</span>
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/game" element={<Game user={user!} setUser={setUser} />} />
      </Routes>

      {challenger && (
        <ChallengeModal
          challenger={challenger}
          onClose={() => setChallenger(null)}
        />
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
