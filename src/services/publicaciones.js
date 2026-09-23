import { supabase } from "../supabase.js";

// R - Leer todas las publicaciones, más nuevas primero
export async function obtenerPublicaciones() {
  return supabase
    .from("publicaciones")
    .select("id, titulo, contenido, creado_en")
    .order("creado_en", { ascending: false });
}

// C - Crear una publicación nueva
export async function crearPublicacion({ titulo, contenido }) {
  return supabase.from("publicaciones").insert({ titulo, contenido });
}

// U - Actualizar una publicación existente por id
export async function actualizarPublicacion(id, cambios) {
  return supabase.from("publicaciones").update(cambios).eq("id", id);
}

// D - Borrar una publicación por id
export async function eliminarPublicacion(id) {
  return supabase.from("publicaciones").delete().eq("id", id);
}
