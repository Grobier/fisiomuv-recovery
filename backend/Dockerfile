# Dockerfile para FisioMuv Recovery Backend
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]

