import { useEffect, useState } from "react";
import {
  obtenerPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
} from "../services/publicaciones";
import estilos from "./Publicaciones.module.css";

const FORM_VACIO = { titulo: "", contenido: "" };

export default function Publicaciones() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [formulario, setFormulario] = useState(FORM_VACIO);
  const [publicacionEditando, setPublicacionEditando] = useState(null); // null = modo "crear"

  async function cargarLista() {
    setCargando(true);
    const { data, error } = await obtenerPublicaciones();
    if (error) {
      alert(error.message);
    } else {
      setLista(data);
    }
    setCargando(false);
  }

  useEffect(() => {
    cargarLista();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  function resetFormulario() {
    setFormulario(FORM_VACIO);
    setPublicacionEditando(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formulario.titulo.trim() || !formulario.contenido.trim()) {
      alert("Completá título y contenido.");
      return;
    }

    if (publicacionEditando) {
      const { error } = await actualizarPublicacion(publicacionEditando.id, formulario);
      if (error) return alert(error.message);
    } else {
      const { error } = await crearPublicacion(formulario);
      if (error) return alert(error.message);
    }

    await cargarLista();
    resetFormulario();
  }

  function handleEditar(publicacion) {
    setPublicacionEditando(publicacion);
    setFormulario({ titulo: publicacion.titulo, contenido: publicacion.contenido });
  }

  function handleCancelar() {
    resetFormulario();
  }

  async function handleBorrar(id) {
    const confirmar = window.confirm("¿Seguro que querés borrar esta publicación?");
    if (!confirmar) return;

    const { error } = await eliminarPublicacion(id);
    if (error) {
      alert(error.message);
      return;
    }

    setLista((prev) => prev.filter((p) => p.id !== id));

    if (publicacionEditando?.id === id) {
      resetFormulario();
    }
  }

  return (
    <div className={estilos.publicaciones}>
      <h1>Novedades de la tienda</h1>
      <p className={estilos.subtitulo}>Anuncios, promociones y novedades para el local.</p>

      <form className={estilos.formulario} onSubmit={handleSubmit}>
        <h2>{publicacionEditando ? "Editar publicación" : "Nueva publicación"}</h2>

        <div className={estilos.campo}>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
          />
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
            {publicacionEditando ? "Guardar cambios" : "Crear"}
          </button>
          {publicacionEditando && (
            <button
              type="button"
              className={`${estilos.boton} ${estilos.botonSecundario}`}
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className={estilos.tituloSeccion}>Listado</h2>

      {cargando && <p className={estilos.mensajeCargando}>Cargando...</p>}
      {!cargando && lista.length === 0 && (
        <p className={estilos.mensajeVacio}>Todavía no hay publicaciones.</p>
      )}

      <ul className={estilos.listaPublicaciones}>
        {lista.map((publicacion) => (
          <li key={publicacion.id} className={estilos.tarjetaPublicacion}>
            <h3>{publicacion.titulo}</h3>
            <p>{publicacion.contenido}</p>
            <small className={estilos.fecha}>
              {new Date(publicacion.creado_en).toLocaleString()}
            </small>
            <div className={estilos.accionesTarjeta}>
              <button
                className={`${estilos.boton} ${estilos.botonSecundario}`}
                onClick={() => handleEditar(publicacion)}
              >
                Editar
              </button>
              <button
                className={`${estilos.boton} ${estilos.botonPeligro}`}
                onClick={() => handleBorrar(publicacion.id)}
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}