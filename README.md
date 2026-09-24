# TP Final - CRUD de Publicaciones
Alumna: Arias Tresita de Luján

## Conexión con Supabase

La aplicación se conecta con Supabase desde el archivo `src/services/supabaseClient.js`. Para realizar esta conexión se utiliza `createClient` de la librería `@supabase/supabase-js`.

La URL del proyecto y la clave de acceso se obtienen desde el archivo `.env`, mediante las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. De esta manera, la aplicación puede comunicarse con la base de datos de Supabase.

Las operaciones sobre la tabla `publicaciones` se encuentran separadas en `src/services/publicaciones.js`. Esto permite que el componente `Publicaciones.jsx` se encargue principalmente de la interfaz, mientras que el archivo de servicios se encarga de realizar las consultas y modificaciones en la base de datos.

## Las cuatro funciones de `src/services/publicaciones.js`

- **`obtenerPublicaciones()`**: trae todas las filas de `publicaciones`, ordenadas por
  fecha de creación (más nuevas primero). Se dispara en el `useEffect` de
  `Publicaciones.jsx` apenas se monta el componente, y también cada vez que se crea o
  edita una publicación (para refrescar la lista contra lo que quedó guardado en la
  base).

- **`crearPublicacion({ titulo, contenido })`**: inserta una fila nueva. Se dispara al
  enviar el formulario cuando no hay ninguna publicación en edición (modo "crear").

- **`actualizarPublicacion(id, cambios)`**: actualiza título y/o contenido de una fila
  puntual, identificada por `id`. Se dispara al enviar el formulario cuando sí hay una
  publicación cargada en `publicacionEditando` (modo "editar").

- **`eliminarPublicacion(id)`**: borra una fila por `id`. Se dispara al hacer clic en
  "Borrar" en cualquier fila de la lista, después de confirmar con `window.confirm`.

## Decisiones de diseño

- Un único formulario sirve para crear y editar. El estado `publicacionEditando`
  funciona como interruptor: si es `null` estamos creando, si tiene datos estamos
  editando.
- Crear y editar refrescan la lista completa pidiéndola de nuevo a Supabase. Borrar
  actualiza el estado local directamente (más rápido, sin ida y vuelta extra al
  servidor).
- Ningún componente importa `supabase` directamente; todo pasa por las cuatro
  funciones de `services/publicaciones.js`.
