# Multi-stage Dockerfile para FisioMuv Recovery Backend
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para compilar)
RUN npm install

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar SOLO dependencias de producción
RUN npm install --only=production && npm cache clean --force

# Copiar código compilado desde el stage anterior
COPY --from=builder /app/dist ./dist

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar ownership de los archivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]

