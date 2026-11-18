import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Coolmath-Games.com - Free Online Math Games, Cool Puzzles, and More",
  description: "Classic 2008 Flash game portal powered by Ruffle, Rails, and PostgreSQL",
};

export default function RootLayout({ children }) {
  const navRow2 = [
    { file: "header_cool-math-games-NAV-2-1.gif", href: "/", label: "Strategy" },
    { file: "header_cool-math-games-NAV-2-2.gif", href: "/", label: "Skill" },
    { file: "header_cool-math-games-NAV-2-3.gif", href: "/", label: "Numbers" },
    { file: "header_cool-math-games-NAV-2-4.gif", href: "/", label: "Logic" },
    { file: "header_cool-math-games-NAV-2-5.gif", href: "/", label: "Memory" },
    { file: "header_cool-math-games-NAV-2-61.gif", href: "/login", label: "Player Login" },
  ];

  const navRow4 = [
    { file: "header_cool-math-games-NAV-4-1.gif", href: "/", label: "Jigsaw" },
    { file: "header_cool-math-games-NAV-4-2.gif", href: "/", label: "Science" },
    { file: "header_cool-math-games-NAV-4-3.gif", href: "/", label: "Trivia" },
    { file: "header_cool-math-games-NAV-4-4.gif", href: "/", label: "More Games" },
    { file: "header_cool-math-games-NAV-4-5.gif", href: "/login", label: "1UP Account" },
  ];

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#000000", backgroundImage: "none", margin: 0, padding: 0 }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "6px" }}>
          {/* Authentic 2008 Sliced Header & Navigation Table */}
          <header style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 0, marginBottom: "10px" }}>
            {/* Top Logo Graphic */}
            <Link href="/" style={{ lineHeight: 0 }}>
              <img
                src="/gifs/header-main.gif"
                alt="Coolmath-Games.com"
                style={{ maxWidth: "100%", height: "auto", display: "block", border: "none" }}
              />
            </Link>

            {/* Nav Row 1 */}
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", lineHeight: 0 }}>
              <Link href="/">
                <img src="/gifs/header_cool-math-games-NAV-1-1.gif" alt="Home" style={{ display: "block", border: "none" }} />
              </Link>
              <Link href="/">
                <img src="/gifs/header_cool-math-games-NAV-1-21.gif" alt="Games" style={{ display: "block", border: "none" }} />
              </Link>
            </div>

            {/* Nav Row 2 */}
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", lineHeight: 0 }}>
              {navRow2.map((item) => (
                <Link key={item.file} href={item.href} title={item.label}>
                  <img src={`/gifs/${item.file}`} alt={item.label} style={{ display: "block", border: "none" }} />
                </Link>
              ))}
            </div>

            {/* Nav Row 4 with Left & Right End Caps */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", lineHeight: 0 }}>
              <img src="/gifs/header_cool-math-games-newNAV-ends-left.gif" alt="" style={{ display: "block", border: "none" }} />
              {navRow4.map((item) => (
                <Link key={item.file} href={item.href} title={item.label}>
                  <img src={`/gifs/${item.file}`} alt={item.label} style={{ display: "block", border: "none" }} />
                </Link>
              ))}
              <img src="/gifs/header_cool-math-games-newNAV-ends-right.gif" alt="" style={{ display: "block", border: "none" }} />
            </div>
          </header>

          {/* Main 2008 Portal Frame */}
          <main
            style={{
              background: "#000000",
              border: "3px solid #66cc00",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            {children}
          </main>

          {/* Classic 2008 Footer & Notice Banner */}
          <footer style={{ textAlign: "center", marginTop: "14px", color: "#66ff66", fontSize: "11px" }}>
            <div style={{ marginBottom: "6px" }}>
              <img
                src="/gifs/160-notice.gif"
                alt="Notice"
                style={{ display: "inline-block", maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div>Coolmath-Games 2008 Portal • Ruffle Flash Emulator + Rails + PostgreSQL</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
