# TP Final - CRUD de Publicaciones

## Cómo correrlo

1. Crear la tabla en Supabase con el contenido de `tabla.sql` (SQL Editor del panel).
2. Copiar `.env.example` a `.env` y completar con la URL y la anon key del proyecto
   (Project Settings → API en el panel de Supabase).
3. `npm install`
4. `npm run dev`

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
