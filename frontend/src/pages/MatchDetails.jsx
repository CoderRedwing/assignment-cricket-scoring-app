import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AddCommentary from "./AddCommentary";

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/matches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data.match || null);
        setCommentary(data.commentary || []);
      })
      .catch((err) => console.error("Error fetching match:", err));
  }, [id]);

  if (!match) return <h2>Loading match...</h2>;

  let runs = 0, wickets = 0, fours = 0, sixes = 0;
  commentary.forEach((c) => {
    if (c.eventType === "RUN") runs += c.runs || 1;
    if (c.eventType === "FOUR") { runs += 4; fours++; }
    if (c.eventType === "SIX") { runs += 6; sixes++; }
    if (c.eventType === "WICKET") wickets++;
  });

  const overs = Math.floor(commentary.length / 6);
  const balls = commentary.length % 6;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{match.teamA} vs {match.teamB}</h1>
      <div style={{ margin: "15px 0", padding: "15px", background: "#f4f4f4", borderRadius: "8px" }}>
        <h2 style={{ margin: "0 0 8px 0", color: "#333" }}>Match Summary</h2>
        <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold" }}>{runs}/{wickets} in {overs}.{balls} overs</p>
        <p style={{ margin: "5px 0" }}>4s: {fours} | 6s: {sixes}</p>
        <Link to={`/match/${id}/live`} style={{ display: "inline-block", marginTop: "10px", padding: "8px 16px", background: "green", color: "white", borderRadius: "6px", textDecoration: "none" }}>🔴 Go to Live Commentary</Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        <AddCommentary matchId={id} commentaryLength={commentary.length} onAdd={(newComment) => setCommentary([...commentary, newComment])} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Commentary List</h2>
        <ul>
          {commentary.map((c) => (
            <li key={c.id}>[{c.eventType}] {c.runs ? `(${c.runs} runs)` : ""} {c.text || ""}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
