import { createClient } from "@supabase/supabase-js";

// Vite solo expone al navegador las variables que empiezan con VITE_.
const direccion = import.meta.env.VITE_SUPABASE_URL;
const claveAnonima = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si falta alguna, avisamos apenas arranca la app, no en medio de una consulta
// con un error de "undefined" imposible de leer.
if (!direccion || !claveAnonima) {
  throw new Error(
    "Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. Revisá el archivo .env."
  );
}

export const supabase = createClient(direccion, claveAnonima);
