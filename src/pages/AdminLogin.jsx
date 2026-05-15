import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().role === "admin") {
        setMessage("Welcome Admin 🔥");
        navigate("/admin");
      } else {
        setMessage("Access Denied 🚫 Not admin");
        await signOut(auth);
      }
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-card">
        <h2>Admin Login 🔐</h2>
        <p className="subtitle">Enter admin credentials to continue</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;