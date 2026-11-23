# Senderos de Aluna · One-pager

Sitio de una sola página de Senderos de Aluna, publicado en `aluna.gt/senderosdealuna/`.

## Estructura de aluna.gt

| URL                          | Contenido                                       | Dónde vive                                                        |
| ---------------------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| `aluna.gt`                   | Splash de selección de proyecto                 | WordPress (SiteGround), página "Inicio"                           |
| `aluna.gt/alunaresidencial/` | Aluna Residencial                               | WordPress (SiteGround), página "Aluna Residencial"                |
| `aluna.gt/senderosdealuna/`  | Este proyecto                                   | Archivos estáticos en `public_html/senderosdealuna/` (SiteGround) |
| `senderos.aluna.gt`          | App Click & Xperience de Senderos (repo aparte) | Vercel, vía CNAME en SiteGround                                   |

El cliente pidió rutas en lugar de subdominios. La excepción es la app CX: usa funciones serverless (`api/`) que SiteGround no puede ejecutar, por eso vive en Vercel con un subdominio.

- `senderos-de-aluna-one-pager.vercel.app` (producción de Vercel de este repo) redirige con 308 a `www.aluna.gt` (splash), a propósito, para que quien tenga el link viejo vea que el sitio ya está publicado. Las previews por rama siguen funcionando.
- `senderos-de-aluna.vercel.app` (app CX) redirige con 308 a `senderos.aluna.gt`.

- DNS: dominio registrado en la asociación de dominios .gt, con nameservers delegados a SiteGround. La zona se administra en _Site Tools → Domain → DNS Zone Editor_.
- El chatbot de Senderos vive en otra aplicación (Railway) y no forma parte de este repo.

## Splash

Página "Inicio" de WordPress (plantilla Elementor Canvas) con un widget HTML que enlaza a `/alunaresidencial/` y `/senderosdealuna/`. Usa una paleta de punto medio entre ambos proyectos:

| Token       | Color     | Origen                                 |
| ----------- | --------- | -------------------------------------- |
| `--primary` | `#166d5c` | Propósito (compartido con Residencial) |
| `--bg`      | `#f3ede1` | Armonía                                |
| `--text`    | `#3c4142` | Origen                                 |
| `--muted`   | `#5c686b` | Origen 2                               |
| `--accent`  | `#df7a5f` | Impulso                                |
| `--line`    | `#dfdbd4` | Armonía 3                              |

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

| Destino    | Cómo                                     | Base                | Uso                         |
| ---------- | ---------------------------------------- | ------------------- | --------------------------- |
| Vercel     | Integración GitHub → Vercel              | `/`                 | Previews por rama y pruebas |
| SiteGround | GitHub Actions (`deploy-siteground.yml`) | `/senderosdealuna/` | Sitio público               |

### Workflow `deploy-siteground.yml`

Corre en cada push a `main`:

1. Instala con pnpm 10 y Node 22.
2. Compila con `VITE_BASE=/senderosdealuna/`.
3. Genera `dist/.htaccess`: las rutas de la SPA cargan `index.html`; `index.html` sin caché y assets con hash con caché de un año.
4. Sube `dist/` por SSH con `rsync --delete` a `www/aluna.gt/public_html/senderosdealuna/`.
5. Purga la caché de SiteGround con `wp sg purge` (si falla, solo deja un aviso en _Actions_).

No crear carpetas dentro de `public_html/senderosdealuna/`: el `rsync --delete` las borra en cada deploy.

Secrets requeridos en _Settings → Secrets and variables → Actions_:

- `SG_SSH_KEY`: llave privada ed25519 (sin contraseña). Su llave pública está importada en SiteGround (_Devs → SSH Keys Manager_).
- `SG_HOST`, `SG_USER`, `SG_PORT`: datos de _SSH Credentials_ en SiteGround.

Flujo de trabajo recomendado: trabajar en una rama, revisar el preview de Vercel, y hacer merge a `main` para publicar. Revisar la pestaña _Actions_ después de cada merge.

### Por qué doble despliegue

Se intentó servir Vercel bajo la ruta con un proxy en el `.htaccess` de SiteGround (`RewriteRule ... [P]`), pero SiteGround lo bloquea (403). Poner Vercel al frente de todo el dominio complicaba WordPress. Subir el build a una carpeta de SiteGround mantiene la ruta pública y conserva el CI con Vercel.

WordPress no interfiere porque la carpeta `senderosdealuna/` existe físicamente y su `.htaccess` raíz solo reescribe lo que no existe.

## Responsive

- Desktop es la base. Móvil y tablet se agregan **solo con variantes `max-lg:` / `max-md:`**, para no alterar desktop.
- Pantallas grandes escalan con `min-[1440px]:` y `min-[1920px]:` (tipografía global en `index.css`).
- Variante propia `short:` (`@custom-variant` en `index.css`): desktop con alto ≤ 820 px (ej. 1280×720). Compacta los formularios para que no generen scroll.
- Header: fijo (`fixed`) en desktop y `absolute` en móvil y tablet (`max-lg:absolute`), donde se desplaza con la página. En desktop, `index.css` aplica `scroll-padding-top: 16px` a `<html>` (≥ 1024 px) para que las anclas (`#seccion`) no queden bajo el header. Si cambia el alto del header (74 px) o el espaciado superior de las secciones, revisar ese valor.
- `html, body { overflow-x: clip; }` en `index.css` como red de seguridad contra scroll horizontal.
- Modelos: debajo de 1024 px la fila de tarjetas se reemplaza por `InfiniteCarousel` (se elige con `useMediaQuery`, no con CSS, para no dejar corriendo la animación oculta). Se pausa mientras hay un modelo abierto (`?modelo=`).
- Plano de conjunto: debajo de 768 px usa `materplan-background-v.jpg` (versión vertical). El contenedor tiene un alto mínimo de `115vw` para que `object-cover` nunca recorte el masterplan arriba o abajo; si se cambia la imagen, recalcular ese valor.
- Bloqueo de scroll (`useLockBodyScroll`): se aplica sobre `<html>`, no sobre `<body>`. Por el `overflow-x: clip` de `index.css`, el scroll de la página lo controla `<html>` y un `overflow: hidden` en `<body>` no tiene efecto.

## Analítica

- GA4 (`G-JZQJGXCNFS`) y Clarity (`yxeodt9m0i`) en `index.html`, compartidos con la app CX.
- Solo se cargan si el hostname termina en `aluna.gt` (las previews de Vercel no envían datos).
- Todas las apps envían el parámetro `app` (`onepager` / `cx`): en GA4 es la dimensión personalizada `app`; en Clarity, la etiqueta `app`.
- Eventos con `track()` (`src/lib/track.ts`): `ver_modelo`, `descargar_ficha`, `descargar_folleto`, `solicitar_folleto`, `iniciar_recorrido`, `click_whatsapp`, `click_contacto`, `click_social`, `click_nav`, `ver_amenidad`, `enviar_cotizacion`, `onboarding_paso`, `onboarding_completo`, `explorar_cx`.
- Dimensiones personalizadas en GA4 (alcance Evento): `app`, `origen`, `seccion`, `amenidad`, `modelo`, `tipo`, `red`, `paso`. Al agregar un parámetro nuevo en `track()`, registrarlo en _Admin → Data display → Custom definitions_ (no es retroactivo).
- Eventos clave (key events) en GA4: `enviar_cotizacion`, `click_contacto`, `descargar_folleto`. Se marcan con la estrella en _Admin → Data display → Events → Recent events_.
- WhatsApp deshabilitado (`WHATSAPP_ACTIVO = false` en `src/const/nav-links.ts`): el cliente usa su propio widget, así que `click_whatsapp` ya no se envía. El botón flotante de WhatsApp se eliminó de `floating-actions.tsx`.

## Formularios (integración con HubSpot vía CX)

El one pager no tiene backend ni llama a HubSpot o Supabase directamente. Todos los formularios envían a
`POST https://senderos.aluna.gt/api/onboarding` (app CX) con `app: 'onepager'`, un `canal` y, si aplica, un
`modelo`. Las reglas de identidad, folio, Medio y Canal viven en CX (ver su `SENDEROS_DE_ALUNA_CONTEXT.md`).

| Formulario | Abre | Canal | Modelo | Folio |
|---|---|---|---|---|
| Onboarding Xperience | `?form=xperience` (Iniciar Recorrido: Explora y Plano) | `op_onboarding` | — | Sí, si el contacto no tenía |
| Folleto comercial | `?form=folleto` (Hero) | `op_folleto` | — | No |
| Ficha técnica | `?form=ficha&modelo=…` (popup de modelo) | `op_ficha` | `Aluna NN` | No |
| Cotiza tu casa | Sección Cotiza | `op_cotiza` | `Aluna NN` | No |

- **`src/lib/leads.ts`** es el único punto de integración: `enviarLead(datos, { canal, modelo? })`, `getLeadGuardado()`,
  `tokenCX()`, `urlCX(token?)`, `modeloHS("96") → "Aluna 96"`, `mensajeError()`, `descargar()`.
  Flags: `FORMULARIOS_ACTIVOS = true`, `FICHAS_ACTIVAS = true`. `AVISO_PRIVACIDAD_URL = "#"` (pendiente).
- **Lead guardado** en `localStorage` `senderos_de_aluna_onepager_lead` (datos + token, vigente 7 días). Al
  guardarse emite `EVENTO_LEAD_GUARDADO` para que Cotiza (montado desde el inicio) precargue sus campos.
- **Con lead guardado**: Folleto y Ficha envían en segundo plano y descargan directo (sin mostrar el form);
  Onboarding envía solo ("Abriendo Click and Xperience…").
- **Después del onboarding**: si la respuesta trae folio (contacto nuevo o primer onboarding de quien llegó
  por otro form) → pantalla de Confirmación con folio → "Explorar proyectos". Si no → directo a CX.
- **Traspaso de sesión a CX**: `https://senderos.aluna.gt/#lead=<token>`; CX inicia sesión sin pedir datos.
- Campos: Nombre, Apellido, Correo, Teléfono (`PhoneField`, E.164, misma librería que CX). Casilla obligatoria
  de Aviso de privacidad en Onboarding, Folleto y Ficha; Cotiza no la lleva (pendiente de decidir).
- Cotiza: tras enviar, el botón desaparece y aparece "Cotizar otro modelo" (evita envíos repetidos).
- CORS: CX solo acepta `https://aluna.gt` y `https://www.aluna.gt` (+ `http://localhost:5173` mientras
  haya cambios del cliente). Para probar en local, usar el puerto 5173.
- `src/const/click-and-xperience.ts`: `CLICK_AND_XPERIENCE_URL = CX_URL`, `CX_DISPONIBLE = true`.
- Datos de prueba: al borrar un contacto en HubSpot, borrar también su fila en Supabase y el localStorage del navegador.

## Estructura del código

```
src/
  assets/       iconos (componentes y SVG), imágenes, logos, fichas técnicas y folleto (PDF)
  components/   botones, botones flotantes, formulario de cotización
    carousel/   carrusel infinito (modelos en móvil y tablet)
    forms/      campos compartidos de formularios
    popup/      popups de modelo, folleto y onboarding Xperience (pasos y stepper)
  const/        enlaces de navegación y redes sociales
  data/         datos de los modelos (75, 88, 96, 105): renders, planos y características
  hooks/        useMediaQuery y useLockBodyScroll
  layout/       layout general
  lib/          track() de GA4 y leads (envío de formularios)
  pages/home/   secciones del one-pager (hero, modelos, amenidades, ubicación, footer, etc.)
  types/        tipos del formulario Xperience
  router.tsx    rutas (una sola: "/")
  main.tsx      punto de entrada
```

## Pendiente

- Actualizar Node local a ≥ 22.22 (React Router 8.5 lo exige).
- URL del aviso de privacidad (`AVISO_PRIVACIDAD_URL` en `src/lib/leads.ts`) y decidir si Cotiza lleva casilla.
- Correo con folio y brochure: workflow de la agencia en HubSpot (se dispara al escribirse `xp_folio`); WhatsApp pendiente.
- Agencia: agregar el Medio "Xperience Senderos de Aluna One Pager" a TURNOS ALUNA.
- Marca de agua "MR2" en la sección "Desarrollado por" (falta el SVG).
- Marcar `onboarding_completo` como key event en GA4.
- Al desarrollar la app de asesores, conciliar los pasos del onboarding con los de `_reuso/asesor` de CX.
