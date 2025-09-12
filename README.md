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
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Instalación Rápida (Recomendada)

```bash
# Clonar el repositorio
git clone <repository-url>
cd Recovery

# Ejecutar script de configuración automática
# En Windows (PowerShell):
.\scripts\setup.ps1

# En Linux/Mac:
./scripts/setup.sh
```

### Instalación Manual

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
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
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

## Scripts Disponibles

### Backend
```bash
npm run dev          # Desarrollo con nodemon
npm run build        # Compilar TypeScript
npm run start        # Iniciar producción
npm run lint         # Linter
npm run format       # Formatear código
```

### Frontend
```bash
npm run dev          # Desarrollo con Vite
npm run build        # Build para producción
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

### Backend (Railway/Render)
1. Conecta tu repositorio
2. Configura las variables de entorno
3. Deploy automático

### Frontend (Vercel)
1. Conecta tu repositorio
2. Configura build command: `cd frontend && npm run build`
3. Output directory: `frontend/dist`

### Variables de Entorno para Producción

```env
PORT=3001
CORS_ORIGIN=https://tu-dominio.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DB_NAME=fisiomuv
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10
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

- ✅ **Validación** cliente y servidor
- ✅ **Rate limiting** para prevenir spam
- ✅ **CORS** configurado
- ✅ **Logging** estructurado
- ✅ **SEO** básico con meta tags
- ✅ **Analytics** ready (GA4/Plausible)
- ✅ **Accesibilidad** AA
- ✅ **Responsive** design
- ✅ **TypeScript** estricto

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
