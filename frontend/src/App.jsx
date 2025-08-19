import React, { useState } from "react";

export default function App() {
  const [shortCode, setShortCode] = useState("");
  const [clicks, setClicks] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheckClicks() {
    if (!shortCode.trim()) {
      setError("Please enter a short URL code");
      setClicks(null);
      return;
    }

    setError("");
    setLoading(true);
    setClicks(null);

    try {
      // Adjust URL path to match your backend API route
      const response = await fetch(
        `http://localhost:3000/api/shorten?code=${encodeURIComponent(shortCode.trim())}`
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || typeof data.click !== "number") {
        throw new Error("Invalid data from server");
      }

      setClicks(data.click);
    } catch (err) {
      setError(err.message || "Failed to fetch click count");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Check Click Count</h2>
      <input
        type="text"
        placeholder="Enter short URL code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={styles.input}
        disabled={loading}
      />
      <button onClick={handleCheckClicks} style={styles.button} disabled={loading}>
        {loading ? "Loading..." : "Get Clicks"}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {clicks !== null && !error && (
        <p style={styles.result}>Click count: {clicks}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "320px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    padding: "10px",
    width: "calc(100% - 24px)",
    fontSize: "16px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    marginTop: "12px",
  },
  result: {
    marginTop: "12px",
    fontWeight: "bold",
    color: "#333",
  },
};
