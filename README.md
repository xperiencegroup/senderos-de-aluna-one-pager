# Senderos de Aluna · One-pager

Sitio de una sola página de Senderos de Aluna, publicado en `aluna.gt/senderosdealuna/`.

## Estructura de aluna.gt

| URL | Contenido | Dónde vive |
|---|---|---|
| `aluna.gt` | Splash de selección de proyecto | WordPress (SiteGround), página "Inicio" |
| `aluna.gt/alunaresidencial/` | Aluna Residencial | WordPress (SiteGround), página "Aluna Residencial" |
| `aluna.gt/senderosdealuna/` | Este proyecto | Archivos estáticos en `public_html/senderosdealuna/` (SiteGround) |

El cliente pidió rutas en lugar de subdominios, por eso todo cuelga del mismo dominio.

- DNS: dominio registrado en la asociación de dominios .gt, con nameservers delegados a SiteGround. La zona se administra en *Site Tools → Domain → DNS Zone Editor*.
- El chatbot de Senderos vive en otra aplicación (Railway) y no forma parte de este repo.

## Splash

Página "Inicio" de WordPress (plantilla Elementor Canvas) con un widget HTML que enlaza a `/alunaresidencial/` y `/senderosdealuna/`. Usa una paleta de punto medio entre ambos proyectos:

| Token | Color | Origen |
|---|---|---|
| `--primary` | `#166d5c` | Propósito (compartido con Residencial) |
| `--bg` | `#f3ede1` | Armonía |
| `--text` | `#3c4142` | Origen |
| `--muted` | `#5c686b` | Origen 2 |
| `--accent` | `#df7a5f` | Impulso |
| `--line` | `#dfdbd4` | Armonía 3 |

## Stack

- React 19, TypeScript 6, Vite 8 con React Compiler (Babel).
- Tailwind CSS 4 (`@tailwindcss/vite`).
- React Router 8 (requiere Node ≥ 22.22).
- Motion, Embla Carousel, React Hook Form.
- Poppins vía `@fontsource/poppins`.
- Gestor de paquetes: **pnpm 10** (es el que usa Vercel; no usar npm para no generar `package-lock.json`).

## Desarrollo local

```bash
pnpm install
pnpm dev                 # http://localhost:5173/
```

Para probar con la ruta de producción:

```bash
VITE_BASE=/senderosdealuna/ pnpm dev
# En Git Bash (Windows):
MSYS_NO_PATHCONV=1 VITE_BASE=/senderosdealuna/ pnpm dev
```

Luego abrir `http://localhost:5173/senderosdealuna/`.

## Base configurable

El sitio funciona en la raíz (Vercel) y en `/senderosdealuna/` (SiteGround) con el mismo código:

- `vite.config.ts`: `base: process.env.VITE_BASE ?? "/"`.
- `src/router.tsx`: `basename` se toma de `import.meta.env.BASE_URL` sin la diagonal final.

Reglas al agregar código:

- Importar imágenes y recursos desde `src/assets` (Vite les aplica la base automáticamente).
- Si se usa algo de `public/` con ruta absoluta, anteponer `import.meta.env.BASE_URL`.
- No escribir rutas fijas que empiecen en `/` para enlaces internos; usar los componentes de React Router o anclas (`#seccion`).

## Despliegue

Hay dos destinos, ambos disparados por GitHub:

| Destino | Cómo | Base | Uso |
|---|---|---|---|
| Vercel | Integración GitHub → Vercel | `/` | Previews por rama y pruebas |
| SiteGround | GitHub Actions (`deploy-siteground.yml`) | `/senderosdealuna/` | Sitio público |

### Workflow `deploy-siteground.yml`

Corre en cada push a `main`:

1. Instala con pnpm 10 y Node 22.
2. Compila con `VITE_BASE=/senderosdealuna/`.
3. Genera `dist/.htaccess` para que las rutas de la SPA carguen `index.html`.
4. Sube `dist/` por SSH con `rsync --delete` a `www/aluna.gt/public_html/senderosdealuna/`.

Secrets requeridos en *Settings → Secrets and variables → Actions*:

- `SG_SSH_KEY`: llave privada ed25519 (sin contraseña). Su llave pública está importada en SiteGround (*Devs → SSH Keys Manager*).
- `SG_HOST`, `SG_USER`, `SG_PORT`: datos de *SSH Credentials* en SiteGround.

Flujo de trabajo recomendado: trabajar en una rama, revisar el preview de Vercel, y hacer merge a `main` para publicar. Revisar la pestaña *Actions* después de cada merge.

### Por qué doble despliegue

Se intentó servir Vercel bajo la ruta con un proxy en el `.htaccess` de SiteGround (`RewriteRule ... [P]`), pero SiteGround lo bloquea (403). Poner Vercel al frente de todo el dominio complicaba WordPress. Subir el build a una carpeta de SiteGround mantiene la ruta pública y conserva el CI con Vercel.

WordPress no interfiere porque la carpeta `senderosdealuna/` existe físicamente y su `.htaccess` raíz solo reescribe lo que no existe.

## Estructura del código

```
src/
  assets/       iconos (componentes y SVG), imágenes, logos
  components/   botones, formulario de cotización, popup de modelos, formulario Xperience
  const/        enlaces de navegación
  data/         datos de los modelos (75, 88, 96, 105)
  layout/       layout general
  pages/home/   secciones del one-pager (hero, modelos, amenidades, ubicación, footer, etc.)
  types/        tipos del formulario Xperience
  router.tsx    rutas (una sola: "/")
  main.tsx      punto de entrada
```

## Pendiente
- Actualizar Node local a ≥ 22.22 (React Router 8.5 lo exige).
