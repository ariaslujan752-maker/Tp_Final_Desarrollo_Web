import { useEffect, useState } from "react";
import {
  obtenerPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
} from "../services/publicaciones";
import PublicacionForm from "./PublicacionForm";
import estilos from "./Publicaciones.module.css";

export default function Publicaciones() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // null = modo "crear"

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

  
  async function guardar(datos) {
    const { error } = editando
      ? await actualizarPublicacion(editando.id, datos)
      : await crearPublicacion(datos);

    if (error) {
      alert(error.message);
      return false;
    }

    await cargarLista();
    setEditando(null);
    return true;
  }

  async function handleBorrar(id) {
    if (!window.confirm("¿Seguro que querés borrar esta publicación?")) return;

    const { error } = await eliminarPublicacion(id);
    if (error) return alert(error.message);

    setLista((prev) => prev.filter((p) => p.id !== id));
    if (editando?.id === id) setEditando(null);
  }

  return (
    <div className={estilos.publicaciones}>
      <h1>Novedades de la tienda</h1>
      <p className={estilos.subtitulo}>Anuncios, promociones y novedades para el local.</p>

      <PublicacionForm
        valoresIniciales={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

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
                onClick={() => setEditando(publicacion)}
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
