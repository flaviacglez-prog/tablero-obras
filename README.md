# Tablero de obras – Oficina Técnica

Página estática (`index.html`) publicada en **GitHub Pages**, con datos compartidos en **Firebase Firestore**.
Cada `push` a `main` se publica solo (ver `.github/workflows/deploy.yml`).

## Puesta en marcha (una sola vez)

### 1. Firebase (gratis, plan Spark)
1. Entrá a https://console.firebase.google.com → **Agregar proyecto** (sin Analytics).
2. **Compilación → Authentication → Comenzar → Anónimo → Habilitar.**
3. **Compilación → Firestore Database → Crear base de datos** (modo producción, región `southamerica-east1` o la más cercana).
4. En **Firestore → Reglas**, pegá el contenido de `firestore.rules` y **Publicar**.
5. **Configuración del proyecto (engranaje) → Tus apps → Web (`</>`)** → registrá la app y copiá el objeto `firebaseConfig`.
6. Pegalo en `firebase-config.js` (reemplazando los `REEMPLAZAR`).
7. Abrí `import.html` con doble clic (una vez) y tocá **Importar**: carga las 44 asignaciones actuales. Después podés borrarlo.

### 2. GitHub Pages
1. Creá un repo nuevo en GitHub (ej. `tablero-obras`) y subí el contenido de esta carpeta.
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada push a `main` dispara el deploy. La URL queda: `https://<tu-usuario>.github.io/tablero-obras/`.
4. En Firebase → Authentication → Settings → **Dominios autorizados**, agregá `<tu-usuario>.github.io`.

## Flujo de trabajo diario
Editás `index.html` (o le pedís los cambios a Claude) → commit → push → en ~1 minuto el sitio se actualiza.
Los datos (asignaciones, comentarios, obras nuevas) viven en Firestore y **no se pisan** al desplegar.

## Qué cambió respecto al artefacto
- `firebase-shim.js` reemplaza la base interna de Claude (`window.claude.use("db")`) por Firestore, con login anónimo.
- Los comentarios viejos no existían (colección vacía), así que no hubo nada que migrar salvo las asignaciones.
- Cada navegador es un "usuario" anónimo distinto: solo podés borrar los comentarios que escribiste desde ese navegador.

## Seguridad
Cualquiera con el link puede leer y escribir (con límites de tamaño en `firestore.rules`). Si más adelante necesitás restringirlo a tu empresa,
se cambia por Cloudflare Access o Firebase Auth con Google Workspace.
