"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const endpoint = isRegister ? "/api/register" : "/api/login";
    const body = isRegister ? { username, email, password } : { username, password };

    const res = await fetch(`http://localhost:3001${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("arcade_token", data.token);
      localStorage.setItem("arcade_user", data.username);
      router.push("/");
    } else {
      setError(data.error || data.errors?.join(", ") || "Auth failed");
    }
  }

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto", border: "4px solid #45a29e", padding: "25px", background: "#1f2833" }}>
      <h1 style={{ fontSize: "18px", marginBottom: "20px" }}>{isRegister ? "NEW PLAYER" : "PLAYER LOGIN"}</h1>
      {error && <p style={{ color: "#ff0055", fontSize: "11px", marginBottom: "15px" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: "10px", fontFamily: "inherit", fontSize: "12px" }}
        />
        {isRegister && (
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", fontFamily: "inherit", fontSize: "12px" }}
          />
        )}
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", fontFamily: "inherit", fontSize: "12px" }}
        />
        <button type="submit" className="arcade-btn">{isRegister ? "CREATE ACCOUNT" : "START"}</button>
      </form>

      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{ marginTop: "20px", background: "none", border: "none", color: "#66fcf1", fontFamily: "inherit", fontSize: "10px", cursor: "pointer" }}
      >
        {isRegister ? "ALREADY HAVE AN ACCOUNT? LOGIN" : "NEED AN ACCOUNT? REGISTER"}
      </button>
    </div>
  );
}
