import rateLimit from 'express-rate-limit';
import { env } from './env';

export const createRateLimit = () => {
  return rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    message: {
      error: 'Demasiadas solicitudes',
      message: 'Has excedido el límite de solicitudes. Intenta de nuevo más tarde.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'rate_limit_exceeded',
        message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
      });
    },
  });
};

