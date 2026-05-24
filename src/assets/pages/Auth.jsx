import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin() {
    if (!loginEmail || !loginPassword) {
      setError("Please fill in all login fields");
      return;
    }
    setError("");
    navigate("/dashboard");
  }

  function handleSignup() {
    if (!name || !signupEmail || !signupPassword) {
      setError("Please fill in all signup fields");
      return;
    }
    setError("");
    navigate("/dashboard");
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container glass-frame">
        {/* LOGIN CARD */}
        <div className="auth-card">
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>

          <p className="or-text">or</p>

          <button className="signup-link" onClick={() => {
            setError("");
            setShowSignup(true);
          }}>
            Sign up
          </button>
        </div>
      </div>

      {/* SIGNUP POPUP */}
      {showSignup && (
        <div className="signup-overlay" onClick={() => setShowSignup(false)}>
          <div
            className="auth-card signup-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Sign Up</h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            {error && <p className="auth-error">{error}</p>}

            <button className="btn btn-primary" onClick={handleSignup}>
              Create Account
            </button>

            <button className="close-btn" onClick={() => {
              setError("");
              setShowSignup(false);
            }}>
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
