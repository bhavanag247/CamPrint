import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card glass-frame">
        <h2>Admin Login</h2>

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
