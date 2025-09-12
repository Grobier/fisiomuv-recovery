#!/bin/bash

# Script de despliegue para FisioMuv Recovery Backend

echo "🚀 Iniciando despliegue de FisioMuv Recovery Backend..."

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --production

# 2. Compilar TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

# 3. Desplegar reglas de Firestore
echo "🔥 Desplegando reglas de Firestore..."
firebase deploy --only firestore:rules

# 4. Desplegar índices de Firestore
echo "📊 Desplegando índices de Firestore..."
firebase deploy --only firestore:indexes

# 5. Iniciar servidor
echo "✅ Iniciando servidor de producción..."
npm start

echo "🎉 Despliegue completado!"
