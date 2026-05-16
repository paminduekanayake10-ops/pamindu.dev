import { useState, useRef } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    if (loading) return;
    
    setLoading(true);
    setMessage("");

    const startTime = Date.now();

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      const elapsed = Date.now() - startTime;
      const minDuration = 300;
      if (elapsed < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
      }

      if (userSnap.exists() && userSnap.data().role === "admin") {
        setMessage("Welcome Admin 🔥");
        navigate("/admin");
      } else {
        setMessage("Access Denied 🚫 Not admin");
        await signOut(auth);
        setLoading(false);
      }
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
    }
  };

  // Move focus from email to password on Enter
  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-card">
        <h2>Admin Login 🔐</h2>
        <p className="subtitle">Enter admin credentials to continue</p>

        <form onSubmit={handleLogin}>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            disabled={loading}
            autoFocus
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? <span className="button-spinner"></span> : "Login"}
          </button>
        </form>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;