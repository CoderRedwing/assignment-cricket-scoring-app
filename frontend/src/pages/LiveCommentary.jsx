import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

let socket;

export default function LiveCommentary() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/matches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data.match || null);
        setCommentary((data.commentary || []).reverse()); 
      })
      .catch((err) => console.error("Fetch error:", err));
    socket = io("http://localhost:3000");
    socket.on("commentaryUpdate", (data) => {
      if (String(data.matchId) === String(id)) {
        setCommentary((prev) => [data, ...prev]); 
      }
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [id]);

  if (!match) return <h2>Loading match...</h2>;

  let runs = 0,
    wickets = 0,
    fours = 0,
    sixes = 0;

  commentary.forEach((c) => {
    switch (c.eventType) {
      case "RUN":
        runs += c.runs || 1;
        break;
      case "FOUR":
        runs += 4;
        fours++;
        break;
      case "SIX":
        runs += 6;
        sixes++;
        break;
      case "WICKET":
        wickets++;
        break;
      default:
        break;
    }
  });

  let overs = 0,
    balls = 0;
  if (commentary.length > 0) {
    const latest = commentary[0];
    overs = latest.over;
    balls = latest.ball;
  }

  const currentOverBalls = commentary.filter((c) => c.over === overs);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>
        {match.teamA} vs {match.teamB}
      </h1>

      <div className="scoreboard">
        <h2>LIVE SCORE</h2>
        <p className="score">
          {runs}/{wickets}
        </p>
        <p>
          {overs}.{balls} overs
        </p>
        <p className="boundaries">
          4s: {fours} | 6s: {sixes}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          margin: "1rem 0",
          position: "sticky",
          top: "0",
          background: "#f5f5f5",
          padding: "0.5rem 0",
          zIndex: 5,
        }}
      >
        {currentOverBalls.map((ball, idx) => (
          <div
            key={idx}
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              fontWeight: "bold",
              background:
                ball.eventType === "WICKET"
                  ? "#ffcccc"
                  : ball.eventType === "SIX"
                  ? "#ccffcc"
                  : ball.eventType === "FOUR"
                  ? "#cce0ff"
                  : "#eee",
              color: ball.eventType === "WICKET" ? "red" : "#000",
            }}
          >
            {ball.eventType === "RUN"
              ? ball.runs || 1
              : ball.eventType === "WICKET"
              ? "W"
              : ball.eventType === "SIX"
              ? "6"
              : ball.eventType === "FOUR"
              ? "4"
              : "•"}
          </div>
        ))}
      </div>

      <h2>Ball by Ball Commentary</h2>
      <ul className="commentary-list">
        {commentary.map((c, i) => (
          <li
            key={i}
            className={
              "commentary-item " +
              (c.eventType === "WICKET"
                ? "wicket"
                : c.eventType === "FOUR"
                ? "four"
                : c.eventType === "SIX"
                ? "six"
                : "")
            }
          >
            <b>
              Over {c.over}.{c.ball}
            </b>{" "}
            →{" "}
            {c.eventType === "RUN"
              ? `${c.runs || 1} run(s)`
              : c.eventType}
          </li>
        ))}
      </ul>
    </div>
  );
}
