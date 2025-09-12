#!/bin/bash

# Script de configuración para FisioMuv Recovery
echo "🚀 Configurando FisioMuv Recovery..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Se requiere Node.js 18 o superior. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del backend"
    exit 1
fi

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias del frontend"
    exit 1
fi

# Crear archivos de entorno
echo "⚙️  Configurando variables de entorno..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Creado backend/.env desde env.example"
    echo "📝 Recuerda configurar MONGODB_URI en backend/.env"
else
    echo "ℹ️  backend/.env ya existe"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    cp frontend/env.example frontend/.env
    echo "✅ Creado frontend/.env desde env.example"
else
    echo "ℹ️  frontend/.env ya existe"
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura MONGODB_URI en backend/.env"
echo "2. Ejecuta 'npm run dev' en backend/ para iniciar el servidor"
echo "3. Ejecuta 'npm run dev' en frontend/ para iniciar el cliente"
echo ""
echo "🌐 URLs:"
echo "  Backend: http://localhost:3001"
echo "  Frontend: http://localhost:5173"
echo ""
echo "📚 Lee el README.md para más información"


