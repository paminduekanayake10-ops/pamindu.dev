import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../config/firebase";

/* =========================
   COLLECTION
========================= */
const projectCollection = collection(db, "projects");

/* =========================
   CREATE PROJECT
========================= */
export const addProject = async (project) => {
  try {
    const cleanProject = {
      title: project.title || "",
      description: project.description || "",
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
      tags: Array.isArray(project.tags)
        ? project.tags
        : [],
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      projectCollection,
      cleanProject
    );

    console.log(
      "✅ Project Added Successfully:",
      docRef.id
    );

    return docRef.id;
  } catch (err) {
    console.error(
      "❌ Error Adding Project:",
      err
    );

    throw err;
  }
};

/* =========================
   GET PROJECTS
========================= */
export const getProjects = async () => {
  try {
    const snapshot = await getDocs(
      projectCollection
    );

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return projects;
  } catch (err) {
    console.error(
      "❌ Error Getting Projects:",
      err
    );

    return [];
  }
};

/* =========================
   UPDATE PROJECT
========================= */
export const updateProject = async (
  id,
  updatedData
) => {
  try {
    if (!id) {
      throw new Error(
        "Project ID is missing"
      );
    }

    const projectRef = doc(
      db,
      "projects",
      id
    );

    const cleanData = {
      title: updatedData.title || "",
      description:
        updatedData.description || "",
      github: updatedData.github || "",
      live: updatedData.live || "",
      image: updatedData.image || "",
      tags: Array.isArray(updatedData.tags)
        ? updatedData.tags
        : [],
      updatedAt: serverTimestamp(),
    };

    await updateDoc(projectRef, cleanData);

    console.log(
      "✏️ Project Updated Successfully:",
      id
    );

    return true;
  } catch (err) {
    console.error(
      "❌ Error Updating Project:",
      err
    );

    throw err;
  }
};

/* =========================
   DELETE PROJECT
========================= */
export const deleteProject = async (
  id
) => {
  try {
    if (!id) {
      throw new Error(
        "Project ID is missing"
      );
    }

    const projectRef = doc(
      db,
      "projects",
      id
    );

    await deleteDoc(projectRef);

    console.log(
      "🗑️ Project Deleted Successfully:",
      id
    );

    return true;
  } catch (err) {
    console.error(
      "❌ Error Deleting Project:",
      err
    );

    throw err;
  }
};