import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MatchesList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/matches")
      .then((res) => res.json())
      .then(setMatches)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏏 Ongoing Matches</h1>
      <div style={{ display: "grid", gap: "15px" }}>
        {matches.map((m) => (
          <Link
            key={m.matchId}
            to={`/match/${m.matchId}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#f8f8f8",
              textDecoration: "none",
              color: "black",
            }}
          >
            <h2 style={{ margin: 0 }}>
              {m.teamA} vs {m.teamB}
            </h2>
            <p style={{ margin: "5px 0", color: "green" }}>LIVE</p>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "gray" }}>
              Match ID: {m.matchId}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
