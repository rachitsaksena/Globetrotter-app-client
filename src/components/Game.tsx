import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { getRandomDestination, submitGuess } from "../api";
import ShareModal from "./ShareModal";
import type { User } from "../types";

export default function Game({
  user,
  setUser,
}: {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}) {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [hints, setHints] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    const data = await getRandomDestination();
    setHints(data.hints);
  };

  const reset = () => {
    setGuess("");
    setFeedback("");
    setAdditionalInfo("");
    fetchDestination();
    setIsComplete(false);
  };

  const handleGuess = async () => {
    const response = await submitGuess(guess);
    const isCorrect = response.isCorrect;
    const message = isCorrect ? response.funFact : response.trivia;
    setFeedback(isCorrect ? "Correct! 🎉" : "Incorrect! 😢");
    setAdditionalInfo(message);
    if (isCorrect) {
      setIsComplete(true);
      setUser((prevUser) => ({ ...prevUser!, score: user.score + 1 }));
    }
  };

  return (
    <div>
      <h1>Globetrotter Challenge</h1>
      {hints && (
        <div>
          <h2>Clues:</h2>
          <ul>
            {hints.map((clue, index) => (
              <li key={index}>{clue}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess}>Submit</button>
          {isComplete ? <button onClick={reset}>Next</button> : null}
          {feedback && <p>{feedback}</p>}
          {additionalInfo && <p>{additionalInfo}</p>}
        </div>
      )}
      <button onClick={() => setShowShareModal(true)}>Share</button>
      {showShareModal && (
        <ShareModal userId={user.id} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
