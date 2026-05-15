import { useState } from "react";
import { signupUser, loginWithGoogle } from "../services/auth";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    try {
      await signupUser(email, password);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Create Account 🚀</h2>
        <p className="auth-subtitle">
          Join and start managing your portfolio
        </p>

        {/* GOOGLE */}
        <button className="google-btn" onClick={loginWithGoogle}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 10.2v3.9h5.5..." />
          </svg>
          Sign up with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        {/* INPUTS */}
        <input
          className="auth-input"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          className="primary-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/" className="auth-link">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;