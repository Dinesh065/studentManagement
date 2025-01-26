import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/students");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(180deg, #6a11cb, #2575fc)", 
        margin: 0,  
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",  
          maxWidth: "400px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontWeight: "600",
            fontSize: "24px",
          }}
        >
          Welcome Back
        </h2>
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Email
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 0 10px rgba(0, 123, 255, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Password
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 0 10px rgba(0, 123, 255, 0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                }}
              />
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
            }}
            onFocus={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
