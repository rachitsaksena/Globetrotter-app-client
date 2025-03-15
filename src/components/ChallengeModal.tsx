import type { User } from "../types";

export default function ChallengeModal({
  challenger,
  onClose,
}: {
  challenger: User;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "gray", padding: 20, borderRadius: 10 }}>
        <h2>You've Been Challenged!</h2>
        <p>
          {challenger.username} has challenged you. Their score:{" "}
          {challenger.score}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
