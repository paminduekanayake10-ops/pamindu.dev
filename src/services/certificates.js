import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";

/* =========================
   COLLECTION
========================= */

const certCollection = collection(
  db,
  "certificates"
);

/* =========================
   GET CERTIFICATES
========================= */

export const getCertificates = async () => {
  try {
    const data = await getDocs(certCollection);

    return data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error(
      "Get Certificates Error:",
      err
    );

    return [];
  }
};

/* =========================
   ADD CERTIFICATE
========================= */

export const addCertificate = async (
  cert
) => {
  try {
    const docRef = await addDoc(
      certCollection,
      {
        ...cert,
        createdAt: Date.now(),
      }
    );

    console.log(
      "Certificate Added:",
      docRef.id
    );

    return docRef;
  } catch (err) {
    console.error(
      "Add Certificate Error:",
      err
    );

    throw err;
  }
};

/* =========================
   UPDATE CERTIFICATE
========================= */

export const updateCertificate =
  async (id, updatedData) => {
    try {
      const certRef = doc(
        db,
        "certificates",
        id
      );

      await updateDoc(certRef, updatedData);

      console.log(
        "Certificate Updated:",
        id
      );
    } catch (err) {
      console.error(
        "Update Certificate Error:",
        err
      );

      throw err;
    }
  };

/* =========================
   DELETE CERTIFICATE
========================= */

export const deleteCertificate =
  async (id) => {
    try {
      const certRef = doc(
        db,
        "certificates",
        id
      );

      await deleteDoc(certRef);

      console.log(
        "Certificate Deleted:",
        id
      );
    } catch (err) {
      console.error(
        "Delete Certificate Error:",
        err
      );

      throw err;
    }
  };
