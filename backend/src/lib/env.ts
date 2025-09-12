import { z } from 'zod';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001').transform(Number),
  CORS_ORIGIN: z.string().url().default('http://localhost:5173'),
  FIREBASE_PROJECT_ID: z.string().min(1, 'FIREBASE_PROJECT_ID es requerido'),
  FIREBASE_PRIVATE_KEY: z.string().min(1, 'FIREBASE_PRIVATE_KEY es requerido'),
  FIREBASE_CLIENT_EMAIL: z.string().email('FIREBASE_CLIENT_EMAIL debe ser un email válido'),
  // Configuración de email
  SMTP_HOST: z.string().min(1, 'SMTP_HOST es requerido'),
  SMTP_PORT: z.string().default('587').transform(Number),
  SMTP_USER: z.string().min(1, 'SMTP_USER es requerido'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS es requerido'),
  SENDGRID_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email('EMAIL_FROM debe ser un email válido'),
  EMAIL_TO: z.string().email('EMAIL_TO debe ser un email válido'),
  RATE_LIMIT_WINDOW_MS: z.string().default('60000').transform(Number),
  RATE_LIMIT_MAX: z.string().default('10').transform(Number),
  NODE_ENV: z.enum(['development', 'production']).default('production'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;

