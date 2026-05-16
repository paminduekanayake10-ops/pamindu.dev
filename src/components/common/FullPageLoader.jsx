// src/components/common/FullPageLoader.jsx
import { useEffect, useState } from "react";

function FullPageLoader({ message = "Loading...", error = false, minDuration = 600 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div className="fullpage-loader">
      <div className="loader-content">
        <div className="spinner"></div>
        <p style={{ color: error ? "#ef4444" : "#475569" }}>{message}</p>
      </div>
    </div>
  );
}

export default FullPageLoader;