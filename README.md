# Senderos de Aluna · One-pager

Sitio de una sola página de Senderos de Aluna, publicado en `aluna.gt/senderosdealuna/`.

## Estructura de aluna.gt

| URL | Contenido | Dónde vive |
|---|---|---|
| `aluna.gt` | Splash de selección de proyecto | WordPress (SiteGround), página "Inicio" |
| `aluna.gt/alunaresidencial/` | Aluna Residencial | WordPress (SiteGround), página "Aluna Residencial" |
| `aluna.gt/senderosdealuna/` | Este proyecto | Archivos estáticos en `public_html/senderosdealuna/` (SiteGround) |
| `senderos.aluna.gt` | App Click & Xperience de Senderos (repo aparte) | Vercel, vía CNAME en SiteGround |

El cliente pidió rutas en lugar de subdominios. La excepción es la app CX: usa funciones serverless (`api/`) que SiteGround no puede ejecutar, por eso vive en Vercel con un subdominio.

- `senderos-de-aluna-one-pager.vercel.app` (producción de Vercel de este repo) redirige con 308 a `www.aluna.gt` (splash), a propósito, para que quien tenga el link viejo vea que el sitio ya está publicado. Las previews por rama siguen funcionando.
- `senderos-de-aluna.vercel.app` (app CX) redirige con 308 a `senderos.aluna.gt`.

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
- `@intl-tel-input/react` + `intl-tel-input` (teléfono en formularios, misma config que la app CX).
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
3. Genera `dist/.htaccess`: las rutas de la SPA cargan `index.html`; `index.html` sin caché y assets con hash con caché de un año.
4. Sube `dist/` por SSH con `rsync --delete` a `www/aluna.gt/public_html/senderosdealuna/`.
5. Purga la caché de SiteGround con `wp sg purge` (si falla, solo deja un aviso en *Actions*).

No crear carpetas dentro de `public_html/senderosdealuna/`: el `rsync --delete` las borra en cada deploy.

Secrets requeridos en *Settings → Secrets and variables → Actions*:

- `SG_SSH_KEY`: llave privada ed25519 (sin contraseña). Su llave pública está importada en SiteGround (*Devs → SSH Keys Manager*).
- `SG_HOST`, `SG_USER`, `SG_PORT`: datos de *SSH Credentials* en SiteGround.

Flujo de trabajo recomendado: trabajar en una rama, revisar el preview de Vercel, y hacer merge a `main` para publicar. Revisar la pestaña *Actions* después de cada merge.

### Por qué doble despliegue

Se intentó servir Vercel bajo la ruta con un proxy en el `.htaccess` de SiteGround (`RewriteRule ... [P]`), pero SiteGround lo bloquea (403). Poner Vercel al frente de todo el dominio complicaba WordPress. Subir el build a una carpeta de SiteGround mantiene la ruta pública y conserva el CI con Vercel.

WordPress no interfiere porque la carpeta `senderosdealuna/` existe físicamente y su `.htaccess` raíz solo reescribe lo que no existe.

## Responsive

- Desktop es la base. Móvil y tablet se agregan **solo con variantes `max-lg:` / `max-md:`**, para no alterar desktop.
- Pantallas grandes escalan con `min-[1440px]:` y `min-[1920px]:` (tipografía global en `index.css`).
- Variante propia `short:` (`@custom-variant` en `index.css`): desktop con alto ≤ 820 px (ej. 1280×720). Compacta los formularios para que no generen scroll.
- `html, body { overflow-x: clip; }` en `index.css` como red de seguridad contra scroll horizontal.

## Analítica

- GA4 (`G-JZQJGXCNFS`) y Clarity (`yxeodt9m0i`) en `index.html`, compartidos con la app CX.
- Solo se cargan si el hostname termina en `aluna.gt` (las previews de Vercel no envían datos).
- Todas las apps envían el parámetro `app` (`onepager` / `cx`): en GA4 es la dimensión personalizada `app`; en Clarity, la etiqueta `app`.
- Eventos con `track()` (`src/lib/track.ts`): `ver_modelo`, `descargar_ficha`, `descargar_folleto`, `solicitar_folleto`, `iniciar_recorrido`, `click_whatsapp`, `click_contacto`, `click_social`, `enviar_cotizacion`, `onboarding_paso`, `onboarding_completo`, `explorar_cx`.

## Formularios (onboarding y folleto)

- **Onboarding Xperience** (`?form=xperience`): entrada + 3 pasos (Tus datos, Interés, Confirmación). "Explorar proyectos" lleva a `senderos.aluna.gt`.
- **Folleto comercial** (`?form=folleto`): formulario previo a la descarga. Si el lead ya está en `localStorage` (`senderos_de_aluna_onepager_lead`), descarga directo.
- **Desactivados por ahora**: `FORMULARIOS_ACTIVOS = false` en `src/lib/leads.ts`. Los botones no abren nada hasta integrar HubSpot.
- `src/lib/leads.ts` es el único punto de integración: hoy simula el envío y guarda el lead en `localStorage`.

## Estructura del código

```
src/
  assets/       iconos (componentes y SVG), imágenes, logos, fichas técnicas y folleto (PDF)
  components/   botones, botones flotantes, formulario de cotización, campos compartidos (forms/),
                popups de modelo, onboarding Xperience y folleto
  const/        enlaces de navegación
  data/         datos de los modelos (75, 88, 96, 105)
  layout/       layout general
  lib/          track() de GA4 y leads (envío de formularios)
  pages/home/   secciones del one-pager (hero, modelos, amenidades, ubicación, footer, etc.)
  types/        tipos del formulario Xperience
  router.tsx    rutas (una sola: "/")
  main.tsx      punto de entrada
```

## Pendiente
- Actualizar Node local a ≥ 22.22 (React Router 8.5 lo exige).
- Integrar formularios con HubSpot (formularios, propiedades y portal) o con `/api/onboarding` de la app CX; decidir tras revisar el diagrama de leads. Luego activar `FORMULARIOS_ACTIVOS`.
- Folio del lead (generación y formato), envío por WhatsApp (servicio de HubSpot) y correo; mostrar los checks del paso 3 solo cuando sean reales.
- Definir si existe un paso extra en el onboarding tras "Por ahora no, gracias".
- URL del aviso de privacidad (`AVISO_PRIVACIDAD_URL` en `src/lib/leads.ts`).
- Marca de agua "MR2" en la sección "Desarrollado por" (falta el SVG).
- `og:url` en `index.html`: `https://aluna.gt/senderosdealuna/`.
