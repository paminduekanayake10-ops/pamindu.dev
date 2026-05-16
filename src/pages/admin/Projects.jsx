import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  addProject,
  updateProject,
  deleteProject,
} from "../../services/projects";
import { uploadImage } from "../../services/uploadImage";
import { ProjectCardSkeleton } from "../../components/common/Skeleton";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // NEW
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", github: "", live: "", image: "", tags: "",
  });
  const [editForm, setEditForm] = useState({
    title: "", description: "", github: "", live: "", image: "", tags: "",
  });

  // Realtime Firestore with initial loading flag
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
      if (initialLoading) setInitialLoading(false);
    });
    return () => unsub();
  }, []);

  const add = async () => {
    if (!window.confirm("Add this project?")) return;
    if (!window.confirm("Are you sure?")) return;
    if (!form.title || !form.description) {
      alert("Title and Description required");
      return;
    }
    try {
      setLoading(true);
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }
      await addProject({
        title: form.title.trim(),
        description: form.description.trim(),
        github: form.github.trim(),
        live: form.live.trim(),
        image: imageUrl,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        createdAt: Date.now(),
      });
      setForm({ title: "", description: "", github: "", live: "", image: "", tags: "" });
      setSelectedFile(null);
      setShowAdd(false);
      alert("Project Added Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    if (!window.confirm("This cannot be undone. Continue?")) return;
    try {
      await deleteProject(id);
      alert("Project Deleted ✅");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditForm({
      title: project.title || "",
      description: project.description || "",
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
      tags: project.tags ? project.tags.join(", ") : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveEdit = async () => {
    if (!window.confirm("Save changes?")) return;
    if (!window.confirm("Confirm update?")) return;
    try {
      setLoading(true);
      let imageUrl = editForm.image;
      if (editFile) {
        imageUrl = await uploadImage(editFile);
      }
      await updateProject(editingId, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        github: editForm.github.trim(),
        live: editForm.live.trim(),
        image: imageUrl,
        tags: editForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      });
      setEditingId(null);
      setEditFile(null);
      alert("Project Updated ✅");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Show skeletons during initial load
  if (initialLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Project Management 🚀</h1>
            <p style={styles.subtitle}>Manage portfolio projects professionally</p>
          </div>
          <button style={styles.addBtn} onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? "✖ Close" : "➕ Add Project"}
          </button>
        </div>
        <div style={styles.grid}>
          {[1, 2, 3].map(i => <ProjectCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // Rest of the original return (the full JSX with add form, edit form, projects grid)
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Project Management 🚀</h1>
          <p style={styles.subtitle}>Manage portfolio projects professionally</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "✖ Close" : "➕ Add Project"}
        </button>
      </div>

      {/* ADD FORM */}
      {showAdd && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Add New Project</h2>
          <input style={styles.input} placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea style={styles.textarea} placeholder="Project Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input style={styles.input} placeholder="GitHub URL" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          <input style={styles.input} placeholder="Live Demo URL" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} />
          <div style={styles.uploadBox}>
            <label style={styles.uploadLabel}>📁 Upload Project Image</label>
            <input type="file" accept="image/*" style={styles.fileInput} onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setSelectedFile(file);
              setForm({ ...form, image: URL.createObjectURL(file) });
            }} />
            {form.image && <img src={form.image} alt="preview" style={styles.preview} />}
          </div>
          <input style={styles.input} placeholder="Tags (React, Firebase, CSS)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <button style={styles.saveBtn} onClick={add} disabled={loading}>{loading ? "Saving..." : "Save Project"}</button>
        </div>
      )}

      {/* PROJECTS GRID */}
      <div style={styles.grid}>
        {projects.map((p) => (
          <div key={p.id} style={styles.card}>
            {editingId === p.id ? (
              <>
                <h2 style={styles.editTitle}>Edit Project</h2>
                <input style={styles.input} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                <textarea style={styles.textarea} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <input style={styles.input} value={editForm.github} onChange={(e) => setEditForm({ ...editForm, github: e.target.value })} />
                <input style={styles.input} value={editForm.live} onChange={(e) => setEditForm({ ...editForm, live: e.target.value })} />
                <div style={styles.uploadBox}>
                  <label style={styles.uploadLabel}>📁 Change Image</label>
                  <input type="file" accept="image/*" style={styles.fileInput} onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setEditFile(file);
                    setEditForm({ ...editForm, image: URL.createObjectURL(file) });
                  }} />
                  {editForm.image && <img src={editForm.image} alt="preview" style={styles.preview} />}
                </div>
                <input style={styles.input} placeholder="Tags" value={editForm.tags} onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })} />
                <button style={styles.saveBtn} onClick={saveEdit}>Save Changes</button>
                <button style={styles.cancelBtn} onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {p.image && <img src={p.image} alt={p.title} style={styles.image} />}
                <div style={styles.cardContent}>
                  <h2 style={styles.projectTitle}>{p.title}</h2>
                  <p style={styles.description}>{p.description}</p>
                  <div style={styles.tags}>
                    {p.tags?.map((tag, i) => <span key={i} style={styles.tag}>{tag}</span>)}
                  </div>
                  <div style={styles.links}>
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={styles.link}>GitHub</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={styles.link}>Live Demo</a>}
                  </div>
                  <div style={styles.actions}>
                    <button style={styles.editBtn} onClick={() => startEdit(p)}>✏ Edit</button>
                    <button style={styles.deleteBtn} onClick={() => remove(p.id)}>🗑 Delete</button>
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

// Styles object unchanged (same as in your original file)
const styles = {
  container: { padding: "25px", color: "white" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" },
  title: { fontSize: "30px", margin: 0, fontWeight: "700" },
  subtitle: { color: "#94a3b8", marginTop: "5px" },
  formTitle: { marginBottom: "20px" },
  addBtn: { background: "linear-gradient(135deg,#3b82f6,#2563eb)", border: "none", color: "white", padding: "12px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  formCard: { background: "#1e293b", padding: "20px", borderRadius: "16px", marginBottom: "30px", border: "1px solid #334155" },
  card: { background: "#1e293b", borderRadius: "16px", overflow: "hidden", border: "1px solid #334155" },
  cardContent: { padding: "18px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "20px" },
  input: { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "10px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none", boxSizing: "border-box" },
  textarea: { width: "100%", minHeight: "110px", padding: "12px", marginBottom: "12px", borderRadius: "10px", border: "1px solid #334155", background: "#0f172a", color: "white", resize: "vertical", outline: "none", boxSizing: "border-box" },
  uploadBox: { border: "2px dashed #334155", borderRadius: "12px", padding: "15px", marginBottom: "15px", background: "#0f172a" },
  uploadLabel: { display: "block", marginBottom: "10px", color: "#cbd5e1", fontWeight: "600" },
  fileInput: { color: "white" },
  preview: { width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "12px", marginTop: "15px" },
  image: { width: "100%", height: "220px", objectFit: "cover" },
  projectTitle: { marginBottom: "10px", fontSize: "22px" },
  description: { color: "#cbd5e1", lineHeight: "1.6" },
  tags: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "15px" },
  tag: { background: "#334155", padding: "6px 10px", borderRadius: "999px", fontSize: "12px" },
  links: { display: "flex", gap: "15px", marginTop: "18px" },
  link: { color: "#60a5fa", textDecoration: "none", fontWeight: "600" },
  actions: { display: "flex", gap: "10px", marginTop: "20px" },
  editBtn: { flex: 1, background: "#f59e0b", border: "none", color: "white", padding: "10px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  deleteBtn: { flex: 1, background: "#ef4444", border: "none", color: "white", padding: "10px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  saveBtn: { width: "100%", background: "#10b981", border: "none", color: "white", padding: "12px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", marginTop: "10px" },
  cancelBtn: { width: "100%", background: "#475569", border: "none", color: "white", padding: "12px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", marginTop: "10px" },
  editTitle: { marginBottom: "20px" },
};

export default Projects;