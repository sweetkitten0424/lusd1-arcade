import { Suspense } from "react";
import Link from "next/link";
import RufflePlayer from "./RufflePlayer";

async function GameContent({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const res = await fetch(`${apiUrl}/api/games/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="cmg-box">
        <h2>Game Not Found!</h2>
        <Link href="/" className="cmg-play-btn">◀ Back to Games</Link>
      </div>
    );
  }

  const { game, leaderboard } = await res.json();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Game Theater Box */}
      <div className="cmg-box">
        <div
          className="cmg-box-header"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <span>🕹️ Now Playing: {game.title}</span>
          <Link
            href="/"
            style={{
              background: "#000",
              color: "#b8ff3b",
              padding: "3px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              textDecoration: "none",
            }}
          >
            ◀ Back to All Games
          </Link>
        </div>

        <RufflePlayer swfUrl={game.file_path} />
      </div>

      {/* Classic High Score Leaderboard Box */}
      <div className="cmg-box" style={{ borderColor: "#ff9900" }}>
        <div className="cmg-box-header" style={{ background: "linear-gradient(90deg, #ffcc33, #ff6600)" }}>
          🏆 High Scores — Top 10 Players
        </div>
        {leaderboard.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#ccddee", margin: 0 }}>
            No high scores recorded yet. Be the first to get on the board!
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ff9900", color: "#ffcc33", textAlign: "left" }}>
                <th style={{ padding: "6px" }}>Rank</th>
                <th style={{ padding: "6px" }}>Player</th>
                <th style={{ padding: "6px" }}>Score</th>
                <th style={{ padding: "6px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #1f3356" }}>
                  <td style={{ padding: "6px", fontWeight: "bold", color: "#b8ff3b" }}>#{idx + 1}</td>
                  <td style={{ padding: "6px" }}>{entry.username}</td>
                  <td style={{ padding: "6px", color: "#66ffff", fontWeight: "bold" }}>{entry.points}</td>
                  <td style={{ padding: "6px", color: "#8899aa" }}>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function GamePage({ params }) {
  return (
    <Suspense fallback={<p style={{ color: "#b8ff3b", fontWeight: "bold" }}>Loading Flash Game...</p>}>
      <GameContent params={params} />
    </Suspense>
  );
}
