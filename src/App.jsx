import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./components/Projects";
import AllProjects from "./pages/AllProjects";
import AllCertificates from "./pages/AllCertificates";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Projects />} />
      <Route path="/projects" element={<AllProjects />} />
      <Route path="/certificates" element={<AllCertificates />} />

      {/* ADMIN PROTECTED */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute user={user}>
            <Admin user={user} logout={logout} />
          </ProtectedAdminRoute>
        }
      />

      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;