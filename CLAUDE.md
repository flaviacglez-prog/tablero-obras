# Instrucciones para Claude (leer siempre antes de trabajar)

## Quién te habla
Las personas que usan este proyecto **no saben programar**. Saben qué producto quieren, no cómo se hace.
- Hablales siempre en **español**, con palabras simples. Nada de jerga técnica: si tenés que nombrar algo técnico, explicalo en una frase.
- Explicá **qué vas a hacer y qué cambió** en lenguaje de producto ("agregué una sección de Presupuestos arriba de la lista"), no en lenguaje de código.
- No les hagas elegir entre opciones técnicas. Decidí vos lo mejor y avisá. Preguntá solo cuando la decisión cambia lo que ellos ven o usan.
- Si algo falla, explicá qué pasó y cómo lo vas a arreglar. No les pidas que ejecuten comandos: hacelo vos.

## Qué es este proyecto
**Tablero de obras** de la Oficina Técnica (Departamento de Infraestructura Edilicia, UCC). Es una página web que muestra y permite editar las obras por sede: responsable, prioridad, etapa, quién la lleva, envergadura, planificación en calendario y comentarios.
- Sitio publicado: https://ucc-oficinatecnica.github.io/tablero-obras/
- Repositorio: https://github.com/ucc-oficinatecnica/tablero-obras (público)
- Se publica **solo** cuando se suben cambios a la rama `main`.

## Cómo está armado (para vos, no para ellos)
- `index.html`: toda la página (diseño, secciones y funciones). La lista base de obras está en la constante `BASE` dentro de ese archivo.
- `firebase-shim.js`: conecta la página con la base de datos (Firebase Firestore, login anónimo).
- `firebase-config.js`: datos del proyecto Firebase `tablero-obras-ot`. Es público por diseño, no es un secreto.
- `firestore.rules`: reglas de seguridad de la base de datos. **Se publican a mano en la consola de Firebase**, no con el deploy.
- `.github/workflows/deploy.yml`: publica la página. Solo copia `index.html`, `firebase-config.js` y `firebase-shim.js`. Si agregás un archivo nuevo que la página necesite, agregalo ahí.
- Datos compartidos (asignaciones, comentarios, obras agregadas) viven en Firestore, **no** en el código. Cambiar el código no borra los datos.

## Cómo trabajar (hacelo vos, sin pedirles que lo hagan)
1. **Antes de tocar nada, traé los últimos cambios** del repositorio (`git pull`). Varias personas editan el mismo proyecto.
2. Si la carpeta todavía no tiene el proyecto, descargalo (`git clone https://github.com/ucc-oficinatecnica/tablero-obras.git`). Si falta Git o el acceso a GitHub, guialos paso a paso.
3. Hacé el cambio pedido. Mantené el estilo y el diseño existentes salvo que pidan cambiarlos. La página debe verse bien en celular y en computadora, en modo claro y oscuro.
4. **Probá que la página abra sin errores** antes de publicar.
5. **Antes de publicar, mostrales qué cambió y preguntales: "¿Lo publico?".** Publicar es subir los cambios (`git commit` + `git push`) y todos lo ven en el sitio en un minuto. No publiques sin su sí.
6. Escribí un mensaje de cambio claro y corto, en español (ej: "Agregar sección de presupuestos").
7. Si al subir hay un choque con cambios de otra persona, resolvelo con cuidado conservando el trabajo de ambos y avisales. Nunca uses fuerza (`--force`) ni borres el trabajo de otro.

## Reglas importantes (no romper)
- **Nunca borres ni sobrescribas datos de Firestore** sin que lo pidan de forma explícita y confirmen.
- **No cambies `firestore.rules`** sin avisar claramente qué implica, y recordá que hay que publicarlas en la consola de Firebase.
- **El repositorio es público.** No pongas contraseñas, claves privadas, tokens ni datos personales en ningún archivo. (La clave de `firebase-config.js` es pública a propósito.)
- No instales programas ni cambies configuraciones de la computadora sin avisar y pedir permiso.
- No agregues servicios de pago ni cuentas nuevas sin consultarlo.
- Si no sabés si un cambio puede romper algo, avisalo antes de publicar.

## Si piden algo grande
Para cambios grandes (rediseñar, reorganizar), avisales que conviene avisarle a los demás que están editando para no pisarse, y sugerí hacerlo por partes.
