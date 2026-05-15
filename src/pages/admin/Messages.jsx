import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);

    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }

    setLoading(false);
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "messages", id));
    loadMessages();
  };

  if (loading) {
    return <p style={{ color: "#94a3b8" }}>Loading messages...</p>;
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>📩 Contact Messages</h2>

      {messages.length === 0 && <p>No messages yet.</p>}

      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid #334155",
          }}
        >
          <h4 style={{ margin: 0 }}>Name: {msg.name}</h4>
          <p style={{ margin: "5px 0", color: "#94a3b8" }}>Email: {msg.email}</p>
          <p>Message: {msg.message}</p>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => deleteMessage(msg.id)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;