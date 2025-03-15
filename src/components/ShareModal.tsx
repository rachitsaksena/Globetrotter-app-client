const imageUrl = "https://picsum.photos/400/300";

export default function ShareModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const shareLink = `${window.location.origin}?challenger=${userId}`;

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
      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
        <h2>Challenge a Friend</h2>
        <img
          src={imageUrl}
          alt="Random"
          style={{ width: "100%", marginBottom: 10 }}
        />
        <p>Share this link:</p>
        <input
          type="text"
          value={shareLink}
          readOnly
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button onClick={() => navigator.clipboard.writeText(shareLink)}>
          Copy Link
        </button>
        <button onClick={onClose} style={{ marginLeft: 10 }}>
          Close
        </button>
      </div>
    </div>
  );
}
