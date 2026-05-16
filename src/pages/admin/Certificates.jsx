import { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../config/firebase";

import {
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../../services/certificates";

function Certificates() {
  const [certs, setCerts] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    year: "",
    description: "",
    credentialUrl: "",
    image: "",
    skills: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    issuer: "",
    year: "",
    description: "",
    credentialUrl: "",
    image: "",
    skills: "",
  });

  /* =========================
     REALTIME FIRESTORE
  ========================= */

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "certificates"),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCerts(data);
      }
    );

    return () => unsub();
  }, []);

  /* =========================
     IMAGE HANDLER
  ========================= */

  const handleImage = (
    file,
    setState,
    currentState
  ) => {
    if (!file) return;

    if (file.size > 1000000) {
      alert("Image must be under 1MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setState({
        ...currentState,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     ADD CERTIFICATE
  ========================= */

  const add = async () => {
    if (!window.confirm("Add certificate?"))
      return;

    if (
      !window.confirm(
        "Are you sure you want to continue?"
      )
    )
      return;

    if (!form.title || !form.issuer) {
      alert("Title and Issuer required");
      return;
    }

    try {
      setLoading(true);

      await addCertificate({
        title: form.title.trim(),
        issuer: form.issuer.trim(),
        year: form.year.trim(),
        description:
          form.description.trim(),
        credentialUrl:
          form.credentialUrl.trim(),
        image: form.image || "",
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        createdAt: Date.now(),
      });

      setForm({
        title: "",
        issuer: "",
        year: "",
        description: "",
        credentialUrl: "",
        image: "",
        skills: "",
      });

      setShowAdd(false);

      alert("Certificate Added ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add certificate");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */

  const remove = async (id) => {
    if (
      !window.confirm(
        "Delete this certificate?"
      )
    )
      return;

    if (
      !window.confirm(
        "This cannot be undone. Continue?"
      )
    )
      return;

    try {
      await deleteCertificate(id);

      alert("Certificate Deleted ✅");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  /* =========================
     START EDIT
  ========================= */

  const startEdit = (c) => {
    setEditingId(c.id);

    setEditForm({
      title: c.title || "",
      issuer: c.issuer || "",
      year: c.year || "",
      description:
        c.description || "",
      credentialUrl:
        c.credentialUrl || "",
      image: c.image || "",
      skills: c.skills
        ? c.skills.join(", ")
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     SAVE EDIT
  ========================= */

  const saveEdit = async () => {
    if (!window.confirm("Save changes?"))
      return;

    if (
      !window.confirm(
        "Confirm certificate update?"
      )
    )
      return;

    try {
      setLoading(true);

      await updateCertificate(
        editingId,
        {
          title: editForm.title.trim(),
          issuer: editForm.issuer.trim(),
          year: editForm.year.trim(),
          description:
            editForm.description.trim(),
          credentialUrl:
            editForm.credentialUrl.trim(),
          image: editForm.image || "",
          skills: editForm.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }
      );

      setEditingId(null);

      alert("Certificate Updated ✅");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Certificates Management 🎓
          </h1>

          <p style={styles.subtitle}>
            Manage portfolio certificates
          </p>
        </div>

        <button
          style={styles.addBtn}
          onClick={() =>
            setShowAdd(!showAdd)
          }
        >
          {showAdd
            ? "✖ Close"
            : "➕ Add Certificate"}
        </button>
      </div>

      {/* ================= ADD FORM ================= */}

      {showAdd && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>
            Add New Certificate
          </h2>

          <input
            style={styles.input}
            placeholder="Certificate Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Issuer"
            value={form.issuer}
            onChange={(e) =>
              setForm({
                ...form,
                issuer: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Year"
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year: e.target.value,
              })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Credential URL"
            value={form.credentialUrl}
            onChange={(e) =>
              setForm({
                ...form,
                credentialUrl:
                  e.target.value,
              })
            }
          />

          {/* IMAGE */}

          <div style={styles.uploadBox}>
            <label style={styles.uploadLabel}>
              📁 Upload Certificate Image
            </label>

            <input
              type="file"
              accept="image/*"
              style={styles.fileInput}
              onChange={(e) =>
                handleImage(
                  e.target.files[0],
                  setForm,
                  form
                )
              }
            />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                style={styles.preview}
              />
            )}
          </div>

          {/* SKILLS */}

          <input
            style={styles.input}
            placeholder="Skills (AWS, AI, React)"
            value={form.skills}
            onChange={(e) =>
              setForm({
                ...form,
                skills: e.target.value,
              })
            }
          />

          <button
            style={styles.saveBtn}
            onClick={add}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Certificate"}
          </button>
        </div>
      )}

      {/* ================= CERTIFICATES GRID ================= */}

      <div style={styles.grid}>
        {certs.map((c) => (
          <div
            key={c.id}
            style={styles.card}
          >
            {editingId === c.id ? (
              <>
                <h2 style={styles.editTitle}>
                  Edit Certificate
                </h2>

                <input
                  style={styles.input}
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      title:
                        e.target.value,
                    })
                  }
                />

                <input
                  style={styles.input}
                  value={editForm.issuer}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      issuer:
                        e.target.value,
                    })
                  }
                />

                <input
                  style={styles.input}
                  value={editForm.year}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      year:
                        e.target.value,
                    })
                  }
                />

                <textarea
                  style={styles.textarea}
                  value={
                    editForm.description
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description:
                        e.target.value,
                    })
                  }
                />

                <input
                  style={styles.input}
                  value={
                    editForm.credentialUrl
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      credentialUrl:
                        e.target.value,
                    })
                  }
                />

                {/* IMAGE */}

                <div style={styles.uploadBox}>
                  <label
                    style={
                      styles.uploadLabel
                    }
                  >
                    📁 Change Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    style={
                      styles.fileInput
                    }
                    onChange={(e) =>
                      handleImage(
                        e.target.files[0],
                        setEditForm,
                        editForm
                      )
                    }
                  />

                  {editForm.image && (
                    <img
                      src={
                        editForm.image
                      }
                      alt="preview"
                      style={
                        styles.preview
                      }
                    />
                  )}
                </div>

                <input
                  style={styles.input}
                  placeholder="Skills"
                  value={editForm.skills}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      skills:
                        e.target.value,
                    })
                  }
                />

                <button
                  style={styles.saveBtn}
                  onClick={saveEdit}
                >
                  Save Changes
                </button>

                <button
                  style={styles.cancelBtn}
                  onClick={() =>
                    setEditingId(null)
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.title}
                    style={styles.image}
                  />
                )}

                <div
                  style={styles.cardContent}
                >
                  <h2
                    style={
                      styles.projectTitle
                    }
                  >
                    {c.title}
                  </h2>

                  <p
                    style={styles.issuer}
                  >
                    {c.issuer}
                  </p>

                  <p
                    style={
                      styles.description
                    }
                  >
                    {c.description}
                  </p>

                  {/* TAGS */}

                  <div style={styles.tags}>
                    {c.skills?.map(
                      (skill, i) => (
                        <span
                          key={i}
                          style={
                            styles.tag
                          }
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  {/* LINK */}

                  {c.credentialUrl && (
                    <a
                      href={
                        c.credentialUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      View Certificate
                    </a>
                  )}

                  {/* ACTIONS */}

                  <div
                    style={styles.actions}
                  >
                    <button
                      style={
                        styles.editBtn
                      }
                      onClick={() =>
                        startEdit(c)
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      style={
                        styles.deleteBtn
                      }
                      onClick={() =>
                        remove(c.id)
                      }
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = {
  container: {
    padding: "25px",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },

  title: {
    fontSize: "30px",
    margin: 0,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "5px",
  },

  addBtn: {
    background:
      "linear-gradient(135deg,#3b82f6,#2563eb)",
    border: "none",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  formCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "30px",
    border: "1px solid #334155",
  },

  formTitle: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#1e293b",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #334155",
  },

  cardContent: {
    padding: "18px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },

  uploadBox: {
    border: "2px dashed #334155",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "15px",
    background: "#0f172a",
  },

  uploadLabel: {
    display: "block",
    marginBottom: "10px",
    color: "#cbd5e1",
    fontWeight: "600",
  },

  fileInput: {
    color: "white",
  },

  preview: {
    width: "100%",
    maxHeight: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginTop: "15px",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  projectTitle: {
    marginBottom: "10px",
    fontSize: "22px",
  },

  issuer: {
    color: "#60a5fa",
    marginBottom: "10px",
  },

  description: {
    color: "#cbd5e1",
    lineHeight: "1.6",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "15px",
  },

  tag: {
    background: "#334155",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
  },

  link: {
    display: "inline-block",
    marginTop: "18px",
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "600",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  editBtn: {
    flex: 1,
    background: "#f59e0b",
    border: "none",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    flex: 1,
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  saveBtn: {
    width: "100%",
    background: "#10b981",
    border: "none",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "10px",
  },

  cancelBtn: {
    width: "100%",
    background: "#475569",
    border: "none",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "10px",
  },

  editTitle: {
    marginBottom: "20px",
  },
};

export default Certificates;