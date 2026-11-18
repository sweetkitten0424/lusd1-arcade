import { Suspense } from "react";
import Link from "next/link";

async function GamePortalGrid() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const res = await fetch(`${apiUrl}/api/games`, { cache: "no-store" });
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
      {/* Left 2008 GIF Button Column */}
      <aside style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
        {leftButtons.map((btn) => (
          <Link key={btn.file} href="/" style={{ lineHeight: 0 }}>
            <img
              src={`/gifs/${btn.file}`}
              alt={btn.alt}
              style={{ maxWidth: "100%", height: "auto", display: "block", border: "none" }}
            />
          </Link>
        ))}

        <div style={{ marginTop: "6px" }}>
          <img src="/gifs/ADblockL.gif" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
        </div>
      </aside>

      {/* Center Game Directory */}
      <section className="cmg-box" style={{ padding: "12px" }}>
        {/* Classic Thinking Games Section Header */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <img
            src="/gifs/header-thinking-games.gif"
            alt="Thinking Games"
            style={{ maxWidth: "100%", height: "auto", display: "inline-block" }}
          />
        </div>

        <Suspense fallback={<p style={{ color: "#b8ff3b", fontWeight: "bold", textAlign: "center" }}>Loading Flash Games...</p>}>
          <GamePortalGrid />
        </Suspense>

        {/* Secondary 2008 Section Header */}
        <div style={{ textAlign: "center", marginTop: "22px", paddingTop: "14px", borderTop: "2px dashed #66cc00" }}>
          <img
            src="/gifs/header-jigsaw-puzzles.gif"
            alt="Jigsaw Puzzles"
            style={{ maxWidth: "100%", height: "auto", display: "inline-block" }}
          />
        </div>
      </section>

      {/* Right 2008 Player & Sidebar Column */}
      <aside style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <div className="cmg-box" style={{ padding: "10px", width: "100%", borderColor: "#ff9900" }}>
          <div
            className="cmg-box-header"
            style={{ background: "linear-gradient(90deg, #ff9900, #ff5500)", color: "#fff", fontSize: "12px" }}
          >
            ★ 1UP Account
          </div>
          <p style={{ fontSize: "11px", color: "#ccddee", margin: "0 0 8px 0", lineHeight: "1.4" }}>
            Log in to save scores to the Top 10 boards!
          </p>
          <Link href="/login" className="cmg-play-btn" style={{ width: "100%", textAlign: "center", fontSize: "11px" }}>
            Login / Sign Up
          </Link>
        </div>

        {/* Classic 140px Sidebar GIFs */}
        {rightPromos.map((promo) => (
          <img
            key={promo.file}
            src={`/gifs/${promo.file}`}
            alt={promo.alt}
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
          />
        ))}

        {/* 2x3 Grid of aa-1 through aa-6 Mini Tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }}>
          {aaBadges.map((badge) => (
            <img
              key={badge}
              src={`/gifs/${badge}`}
              alt=""
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
            />
          ))}
        </div>

        <img src="/gifs/ADblockR.gif" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
      </aside>
    </div>
  );
}
