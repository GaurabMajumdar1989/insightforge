import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup({
        email,
        password,
        full_name: fullName
      });

      navigate("/login");
    } catch (err) {
      setError("Signup failed. Email may already be registered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>

        {error && <p className="signup-error">{error}</p>}

        <input
          className="signup-input"
          type="text"
          placeholder="Full Name (optional)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="signup-input"
          type="email"
          placeholder="Email (required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="signup-input"
          type="password"
          placeholder="Password (required)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="signup-btn" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Create Account"}
        </button>

        <p className="signup-switch-text">
          Already have an account?{" "}
          <span
            className="signup-link"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
