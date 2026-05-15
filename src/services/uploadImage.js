import { supabase } from "./supabase";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("projects")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload Error:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("projects")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
  console.log("FILE:", file);
};