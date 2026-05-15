import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      // 1. SAVE TO FIRESTORE
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
      });

      // 2. EMAIL TO YOU (ADMIN NOTIFICATION)
      await emailjs.send(
        "service_7llf81a",
        "template_rje5wa9",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "QqEYwc3oSyz1qVZHD"
      );

      // 3. AUTO REPLY EMAIL TO USER
      await emailjs.send(
        "service_7llf81a",
        "template_agysnsv",
        {
          name: form.name,
          email: form.email,
        },
        "QqEYwc3oSyz1qVZHD"
      );

      setStatus("Message sent successfully ✅");

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send ❌");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Contact Me</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
        />

        <button type="submit">Send</button>

        {status && <p>{status}</p>}
      </form>
    </section>
  );
}

export default Contact;