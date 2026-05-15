import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const getDashboardStats = async () => {
  const projectsSnap = await getDocs(collection(db, "projects"));
  const certSnap = await getDocs(collection(db, "certificates"));

  return {
    projects: projectsSnap.size,
    certificates: certSnap.size,
  };
};