import { useEffect, useState } from "react";
import estilos from "./PublicacionForm.module.css";

const VACIO = { titulo: "", contenido: "" };


export default function PublicacionForm({ valoresIniciales, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState(VACIO);

  
  useEffect(() => {
    setFormulario(valoresIniciales ?? VACIO);
  }, [valoresIniciales]);

  function handleChange(e) {
    setFormulario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formulario.titulo.trim() || !formulario.contenido.trim()) {
      alert("Completá título y contenido.");
      return;
    }

    const guardadoOk = await onGuardar(formulario);
    if (guardadoOk) setFormulario(VACIO);
  }

  return (
    <form className={estilos.formulario} onSubmit={handleSubmit}>
      <h2>{valoresIniciales ? "Editar publicación" : "Nueva publicación"}</h2>

      <div className={estilos.campo}>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" value={formulario.titulo} onChange={handleChange} />
      </div>

      <div className={estilos.campo}>
        <label htmlFor="contenido">Contenido</label>
        <textarea
          id="contenido"
          name="contenido"
          value={formulario.contenido}
          onChange={handleChange}
        />
      </div>

      <div className={estilos.accionesFormulario}>
        <button type="submit" className={`${estilos.boton} ${estilos.botonPrimario}`}>
          {valoresIniciales ? "Guardar cambios" : "Crear"}
        </button>
        {valoresIniciales && (
          <button
            type="button"
            className={`${estilos.boton} ${estilos.botonSecundario}`}
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
