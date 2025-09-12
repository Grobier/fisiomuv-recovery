import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';

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

// Rate limiting
app.use('/api', createRateLimit());

// Rutas
app.use('/api/health', healthRoutes);
app.use('/api/preventa', preventaRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'FisioMuv Recovery API',
    version: '1.0.0',
    environment: env.NODE_ENV,
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'not_found',
    message: 'Ruta no encontrada',
  });
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

