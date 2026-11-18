import { Suspense } from "react";
import Link from "next/link";
import { fetchFromRails } from "@/lib/arcadeApi";

async function PlayerBox() {
  const res = await fetchFromRails("/api/me");
  const player = res.ok ? await res.json() : null;

  return (
    <div className="cmg-box" style={{ padding: "10px", width: "100%", borderColor: "#ff9900" }}>
      <div
        className="cmg-box-header"
        style={{ background: "linear-gradient(90deg, #ff9900, #ff5500)", color: "#fff", fontSize: "12px" }}
      >
        ★ 1UP Player
      </div>
      {player ? (
        <div>
          <p style={{ fontSize: "12px", color: "#b8ff3b", fontWeight: "bold", margin: "0 0 4px 0" }}>
            Welcome, {player.username}!
          </p>
          <p style={{ fontSize: "10px", color: "#8899aa", margin: "0 0 10px 0", wordBreak: "break-all" }}>
            {player.email}
          </p>
          <a
            href="/cdn-cgi/access/logout"
            className="cmg-play-btn"
            style={{ width: "100%", textAlign: "center", fontSize: "11px", background: "#cc0033" }}
          >
            Log Out
          </a>
        </div>
      ) : (
        <a
          href="/cdn-cgi/access/login?redirect_url=/"
          className="cmg-play-btn"
          style={{ width: "100%", textAlign: "center", fontSize: "11px" }}
        >
          Sign In with Cloudflare
        </a>
      )}
    </div>
  );
}

async function GamePortalGrid() {
  const res = await fetchFromRails("/api/games");
  const games = res.ok ? await res.json() : [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
      {games.map((game) => (
        <div key={game.id} className="cmg-game-card">
          <div
            style={{
              height: "90px",
              background: "linear-gradient(135deg, #003366 0%, #006699 100%)",
              border: "2px solid #ffffff",
              borderRadius: "6px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 900,
              color: "#b8ff3b",
              padding: "6px",
              textShadow: "1px 1px 2px #000",
            }}
          >
            {game.title}
          </div>

          <h3 style={{ fontSize: "14px", margin: "0 0 6px 0", color: "#ffffff" }}>{game.title}</h3>
          <div style={{ fontSize: "11px", color: "#66ffff", marginBottom: "8px", fontWeight: "bold" }}>
            {game.system.toUpperCase()} GAME
          </div>

          <Link href={`/play/${game.slug}`} className="cmg-play-btn" style={{ fontSize: "12px", padding: "5px 12px" }}>
            PLAY ▶
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const leftButtons = [
    { file: "button-new-games.gif", alt: "New Games" },
    { file: "button-coolmath-top-10.gif", alt: "Coolmath Top 10" },
    { file: "button-karens-faves.gif", alt: "Karen's Faves" },
    { file: "button-flash-games.gif", alt: "Flash Games" },
    { file: "button-java-games.gif", alt: "Java Games" },
    { file: "button-math-games.gif", alt: "Math Games" },
  ];

  const rightPromos = [
    { file: "140-store.gif", alt: "Coolmath Store" },
    { file: "140-math-books.gif", alt: "Math Books" },
    { file: "140-addvert.gif", alt: "Featured" },
  ];

  const aaBadges = ["aa-1.gif", "aa-2.gif", "aa-3.gif", "aa-4.gif", "aa-5.gif", "aa-6.gif"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "175px 1fr 155px", gap: "12px", alignItems: "start" }}>
      <aside style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
        {leftButtons.map((btn) => (
          <Link key={btn.file} href="/" style={{ lineHeight: 0 }}>
            <img src={`/gifs/${btn.file}`} alt={btn.alt} style={{ maxWidth: "100%", height: "auto", display: "block" }} />
          </Link>
        ))}
        <div style={{ marginTop: "6px" }}>
          <img src="/gifs/ADblockL.gif" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
        </div>
      </aside>

      <section className="cmg-box" style={{ padding: "12px" }}>
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <img src="/gifs/header-thinking-games.gif" alt="Thinking Games" style={{ maxWidth: "100%", height: "auto" }} />
        </div>

        <Suspense fallback={<p style={{ color: "#b8ff3b", fontWeight: "bold", textAlign: "center" }}>Loading Flash Games...</p>}>
          <GamePortalGrid />
        </Suspense>

        <div style={{ textAlign: "center", marginTop: "22px", paddingTop: "14px", borderTop: "2px dashed #66cc00" }}>
          <img src="/gifs/header-jigsaw-puzzles.gif" alt="Jigsaw Puzzles" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      </section>

      <aside style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Suspense fallback={<div className="cmg-box" style={{ width: "100%", fontSize: "11px" }}>Checking 1UP...</div>}>
          <PlayerBox />
        </Suspense>

        {rightPromos.map((promo) => (
          <img key={promo.file} src={`/gifs/${promo.file}`} alt={promo.alt} style={{ maxWidth: "100%", height: "auto" }} />
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }}>
          {aaBadges.map((badge) => (
            <img key={badge} src={`/gifs/${badge}`} alt="" style={{ maxWidth: "100%", height: "auto" }} />
          ))}
        </div>

        <img src="/gifs/ADblockR.gif" alt="" style={{ maxWidth: "100%", height: "auto" }} />
      </aside>
    </div>
  );
}
