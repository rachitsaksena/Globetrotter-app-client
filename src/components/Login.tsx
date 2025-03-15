import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, login, register } from "../api";
import type { User } from "../types";

export default function Login({ setUser }: { setUser: (user: User) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile()
        .then((data) => setUser(data))
        .then(() => {
          navigate("/game");
        });
    }
  }, [navigate, setUser]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(username, password);
        setIsRegistering(false);
      } else {
        const data = await login(username, password);
        localStorage.setItem("token", data.accessToken);
        const user = await getUserProfile();
        localStorage.setItem("username", username);
        setUser(user);
      }
      navigate("/game");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ marginTop: 16 }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Need an account? Register"}
      </button>
    </div>
  );
}
