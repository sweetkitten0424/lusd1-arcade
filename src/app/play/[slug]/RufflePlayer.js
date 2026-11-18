"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

export default function RufflePlayer({ swfUrl }) {
  const containerRef = useRef(null);

  const loadRuffle = () => {
    if (window.RufflePlayer && containerRef.current) {
      window.RufflePlayer.config = { publicPath: "/ruffle/" };
      const ruffle = window.RufflePlayer.newest();
      const player = ruffle.createPlayer();
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(player);
      player.style.width = "100%";
      player.style.height = "600px";
      player.load(swfUrl);
    }
  };

  useEffect(() => {
    if (window.RufflePlayer) loadRuffle();
  }, [swfUrl]);

  return (
    <div>
      <Script src="/ruffle/ruffle.js" strategy="afterInteractive" onLoad={loadRuffle} />
      <div
        ref={containerRef}
        style={{ width: "100%", height: "600px", background: "#000", border: "4px solid #45a29e" }}
      />
    </div>
  );
}
