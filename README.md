# FisioMuv Recovery - Landing Page

Monorepo para la landing page de FisioMuv Recovery con backend y frontend listos para producción.

## Estructura del Proyecto

```
├── frontend/          # React + Vite + TypeScript + Tailwind
├── backend/           # Node + Express + TypeScript
├── README.md          # Este archivo
├── .editorconfig      # Configuración del editor
├── .eslintrc.cjs      # Configuración ESLint
└── .prettierrc        # Configuración Prettier
```

## Tech Stack

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **React Hook Form** + **Zod** para formularios
- **Analytics** (GA4/Plausible ready)

### Backend
- **Node.js** + **Express** + **TypeScript**
- **MongoDB Atlas** con **Mongoose**
- **CORS** configurado
- **Rate limiting** con express-rate-limit
- **Logging** con Pino

## Instalación y Desarrollo

### Prerrequisitos
- Node.js 22.x (especificado en engines)
- MongoDB Atlas account o Firebase
- Git

### Instalación (Monorepo)

```bash
# Clonar el repositorio
git clone <repository-url>
cd Recovery

# Instalar todas las dependencias desde la raíz
npm run install:all

# O alternativamente, ejecutar script de configuración automática
# En Windows (PowerShell):
.\scripts\setup.ps1

# En Linux/Mac:
./scripts/setup.sh
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` en el directorio `backend/`:

```bash
cd backend
cp .env.example .env
```

Edita `.env` con tus valores:

```env
PORT=3001
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DB_NAME=fisiomuv
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10
```

### 3. Ejecutar en desarrollo

```bash
# Opción 1: Desarrollo separado (recomendado para desarrollo)
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Opción 2: Desde la raíz (usa concurrently)
npm run dev
```

- Backend: http://localhost:3001 (API)
- Frontend: http://localhost:5173 (desarrollo)

### 4. Build y ejecución unificada (como en producción)

```bash
# Desde la raíz del proyecto
npm run install:all
npm run build:all
npm run start

# Visitar http://localhost:3000 (servidor unificado)
```

## Scripts Disponibles

### Raíz (Monorepo) - **Usar para producción**
```bash
npm run install:all     # Instalar deps de backend y frontend
npm run build:backend   # Compilar TypeScript del backend
npm run build:frontend  # Build del frontend con Vite
npm run postbuild:copy  # Copiar frontend/dist a backend/public
npm run build:all       # Build completo (backend + frontend + copy)
npm run start           # Iniciar servidor unificado en producción
npm run dev             # Desarrollo concurrente (ambos proyectos)
```

### Backend
```bash
npm run dev            # Desarrollo con nodemon
npm run build          # Compilar TypeScript
npm run start          # Iniciar producción
npm run lint           # Linter
npm run format         # Formatear código

# Scripts para despliegue alternativo (Root Directory = backend)
npm run preinstall     # Instala deps del frontend
npm run build:frontend # Build del frontend desde backend
npm run postbuild:copy # Copia dist a backend/public
npm run build:all      # Build completo desde backend
```

### Frontend
```bash
npm run dev          # Desarrollo con Vite
npm run build        # Build para producción (solo vite build)
npm run preview      # Preview del build
npm run lint         # Linter
npm run format       # Formatear código
```

## API Endpoints

### `GET /api/health`
Verifica el estado del servidor.

**Response:**
```json
{
  "ok": true
}
```

### `POST /api/preventa`
Registra un lead de preventa.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "interes": "Masaje",
  "consent": true
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Lead registrado correctamente"
}
```

## Despliegue

### Opción 1: Despliegue Unificado en Render (Recomendado)

El backend sirve el frontend estáticamente como una SPA.

#### Configuración para Root Directory = Repositorio (Recomendado)
```yaml
# render.yaml o configuración web
Build Command: npm run build:all
Start Command: npm run start
Environment: Node 22.x
```

**IMPORTANTE:** No uses `npm ci` en la raíz ya que no instala las dependencias de los subdirectorios. El script `build:all` incluye `install:all` que maneja esto correctamente.

#### Configuración para Root Directory = backend/ (Alternativa)
```yaml
# render.yaml o configuración web  
Build Command: npm ci && npm run build:all
Start Command: npm run start
Environment: Node 22.x
Root Directory: backend
```

### Troubleshooting de Despliegue

#### Error: "Cannot find module" durante build
**Causa:** Las dependencias no se instalan correctamente en Render.
**Solución:** Asegúrate de usar el comando correcto:
- ✅ `Build Command: npm run build:all` (recomendado)
- ❌ `Build Command: npm ci && npm run build:all` (problemático en monorepo)

#### Error: "Cannot find name 'console'" en TypeScript
**Causa:** Configuración de TypeScript no incluye tipos de Node.js.
**Solución:** Ya corregido en `backend/tsconfig.json` con `"types": ["node"]`.

#### Error: Frontend no se sirve (404 en rutas)
**Causa:** El directorio `public/` no existe o está vacío.
**Solución:** Verifica los logs del servidor que muestran:
```
🔍 DIAGNÓSTICO DE RUTAS:
  __dirname: /opt/render/project/src/backend/dist
  publicDir: /opt/render/project/src/backend/dist/public
  ¿Directorio public existe?: true
  ¿index.html existe?: true
```

### Opción 2: Despliegue Separado (Anterior)

#### Backend (Railway/Render)
1. Conecta tu repositorio
2. Root Directory: `backend`
3. Build Command: `npm ci && npm run build`
4. Start Command: `npm run start`
5. Configura las variables de entorno

#### Frontend (Vercel)
1. Conecta tu repositorio  
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Variables de Entorno para Producción

```env
# Puerto para el servidor unificado (Render usa process.env.PORT automáticamente)
PORT=3000
# En desarrollo local, el frontend se sirve desde este mismo puerto
CORS_ORIGIN=https://tu-dominio.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DB_NAME=fisiomuv
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10

# Variables específicas para Firebase (si usas Firebase en lugar de MongoDB)
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

## Estructura de la Base de Datos

### Colección: `preventas`

```typescript
interface PreVentaLead {
  email: string;
  nombre?: string;
  interes: 'Masaje' | 'Pistola' | 'Sauna' | 'Pack';
  origen: 'landing';
  timestamp: number;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  referer?: string;
  consent: boolean;
}
```

## Características

- ✅ **Despliegue unificado** - Frontend servido estáticamente por el backend
- ✅ **Validación** cliente y servidor con Zod
- ✅ **Rate limiting** para prevenir spam
- ✅ **CORS** configurado
- ✅ **Logging** estructurado con Pino
- ✅ **SEO** básico con meta tags
- ✅ **Analytics** ready (GA4/Plausible)
- ✅ **Accesibilidad** AA
- ✅ **Responsive** design
- ✅ **TypeScript** estricto
- ✅ **SPA routing** - React Router compatible
- ✅ **Monorepo** con scripts unificados

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
