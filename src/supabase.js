import { createClient } from "@supabase/supabase-js";

const direccion = import.meta.env.VITE_SUPABASE_URL;
const claveAnonima = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!direccion || !claveAnonima) {
  throw new Error(
    "Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. Revisá el archivo .env."
  );
}

export const supabase = createClient(direccion, claveAnonima);
