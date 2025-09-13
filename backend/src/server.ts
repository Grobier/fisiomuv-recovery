/**
 * FisioMuv Recovery Backend Server
 * 
 * Este servidor Express sirve tanto la API como el frontend React estático.
 * El frontend se construye en dist/ y se copia a backend/public/ durante el build.
 * 
 * Configuración para SPA:
 * - Los archivos estáticos se sirven desde /public
 * - Las rutas de API están bajo /api/*
 * - Todas las demás rutas redirigen a index.html (SPA fallback)
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import path from 'path';
import fs from 'fs';

import { env } from './lib/env';
import { createRateLimit } from './lib/rateLimit';
import { initializeFirebase } from './db/firebase';

// Rutas
import healthRoutes from './routes/health';
import preventaRoutes from './routes/preventa';

// Configurar logger
const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  ...(env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
});

const app = express();

// Middleware de logging
app.use(pinoHttp({ logger }));

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: false, // Deshabilitado para desarrollo
  crossOriginEmbedderPolicy: false,
}));

// CORS configurado
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos del frontend desde el directorio public
// En producción: __dirname apunta a dist/, por lo que public/ está en dist/public/
// Los archivos del frontend se copian a backend/public/ durante el build
const publicDir = path.join(__dirname, 'public');

// Log de diagnóstico para verificar rutas
console.log('🔍 DIAGNÓSTICO DE RUTAS:');
console.log('  __dirname:', __dirname);
console.log('  publicDir:', publicDir);
console.log('  process.cwd():', process.cwd());

// Verificar si el directorio public existe
const publicExists = fs.existsSync(publicDir);
console.log('  ¿Directorio public existe?:', publicExists);

if (publicExists) {
  const files = fs.readdirSync(publicDir);
  console.log('  Archivos en public:', files.slice(0, 5)); // Solo mostrar primeros 5
  const indexExists = fs.existsSync(path.join(publicDir, 'index.html'));
  console.log('  ¿index.html existe?:', indexExists);
} else {
  console.warn('⚠️ ADVERTENCIA: Directorio public no encontrado. El frontend no se servirá correctamente.');
}

app.use(express.static(publicDir));

// Rate limiting
app.use('/api', createRateLimit());

// Rutas
app.use('/api/health', healthRoutes);
app.use('/api/preventa', preventaRoutes);

// Ruta de bienvenida para API
app.get('/api', (req, res) => {
  res.json({
    message: 'FisioMuv Recovery API',
    version: '1.0.0',
    environment: env.NODE_ENV,
  });
});

// Ruta catch-all para SPA - debe ir después de las rutas API
// Sirve index.html para todas las rutas no-API, permitiendo que React Router maneje el routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err, 'Error no manejado');
  
  res.status(err.status || 500).json({
    error: 'internal_error',
    message: env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message,
  });
});

// Función para verificar conexiones
const checkConnections = async () => {
  console.log('\n🚀 ===== FISIOMUV RECOVERY BACKEND =====');
  console.log(`📅 Iniciando en modo: ${env.NODE_ENV.toUpperCase()}`);
  console.log(`🌐 Puerto: ${env.PORT}`);
  console.log(`🔗 CORS Origin: ${env.CORS_ORIGIN}`);
  
  // Verificar Firebase
  try {
    console.log('\n🔥 Verificando Firebase...');
    initializeFirebase();
    console.log('✅ Firebase conectado correctamente');
    console.log(`   📊 Proyecto: ${env.FIREBASE_PROJECT_ID}`);
    console.log(`   📧 Service Account: ${env.FIREBASE_CLIENT_EMAIL}`);
  } catch (error) {
    console.log('❌ Error conectando Firebase:', error);
    throw error;
  }

  // Verificar configuración de email
  console.log('\n📧 Verificando configuración de email...');
  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    console.log('✅ Configuración de email completa');
    console.log(`   📮 SMTP Host: ${env.SMTP_HOST}`);
    console.log(`   📧 Usuario: ${env.SMTP_USER}`);
    console.log(`   📨 Desde: ${env.EMAIL_FROM}`);
    console.log(`   📬 Hacia: ${env.EMAIL_TO}`);
  } else {
    console.log('⚠️  Configuración de email incompleta - emails deshabilitados');
  }

  // Verificar SendGrid (opcional)
  if (env.SENDGRID_API_KEY) {
    console.log('✅ SendGrid configurado (opcional)');
  }

  console.log('\n🎯 ===== SISTEMA LISTO =====\n');
};

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Verificar todas las conexiones
    await checkConnections();
    
    // Iniciar servidor
    const server = app.listen(env.PORT, () => {
      logger.info({
        port: env.PORT,
        environment: env.NODE_ENV,
        cors_origin: env.CORS_ORIGIN,
      }, 'Servidor iniciado correctamente');
    });

    // Manejo graceful de shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`Recibida señal ${signal}. Cerrando servidor...`);
      
      server.close(() => {
        logger.info('Servidor cerrado correctamente');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error(error, 'Error iniciando servidor');
    process.exit(1);
  }
};

// Iniciar servidor si es llamado directamente
if (require.main === module) {
  startServer();
}

export default app;

