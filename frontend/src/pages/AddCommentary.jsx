import { useState } from "react";

export default function AddCommentary({ matchId, onAdd, commentaryLength }) {
  const [eventType, setEventType] = useState("RUN");
  const [runs, setRuns] = useState(1);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const over = Math.floor(commentaryLength / 6);
    const ball = commentaryLength % 6;

    const payload = {
      eventType,
      runs: eventType === "RUN" ? runs : 0,
      text,
      over,
      ball
    };

    try {
      const res = await fetch(`http://localhost:3000/matches/${matchId}/commentary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to add commentary");

      const newComment = await res.json();
      onAdd && onAdd(newComment);
      setText("");
      setRuns(1);
    } catch (err) {
      console.error(err);
      alert("Failed to add commentary");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Live Commentary (Match {matchId})</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <label>
          Event Type:
          <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={{ width: "100%", padding: "6px" }}>
            <option value="RUN">Run</option>
            <option value="FOUR">Four</option>
            <option value="SIX">Six</option>
            <option value="WICKET">Wicket</option>
            <option value="DOT">Dot Ball</option>
          </select>
        </label>
        {eventType === "RUN" && (
          <label>
            Runs:
            <input type="number" min="1" max="3" value={runs} onChange={(e) => setRuns(Number(e.target.value))} style={{ width: "100%", padding: "6px" }} />
          </label>
        )}
        <label>
          Description:
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </label>
        <button type="submit" style={{ padding: "8px", background: "blue", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }}>➕ Add Commentary</button>
      </form>
    </div>
  );
}
