# Script de configuración para FisioMuv Recovery (PowerShell)
Write-Host "🚀 Configurando FisioMuv Recovery..." -ForegroundColor Green

# Verificar Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green
    
    $versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($versionNumber -lt 18) {
        Write-Host "❌ Se requiere Node.js 18 o superior. Versión actual: $nodeVersion" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero." -ForegroundColor Red
    exit 1
}

# Instalar dependencias del backend
Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias del backend" -ForegroundColor Red
    exit 1
}

# Instalar dependencias del frontend
Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
Set-Location ../frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias del frontend" -ForegroundColor Red
    exit 1
}

# Volver al directorio raíz
Set-Location ..

# Crear archivos de entorno
Write-Host "⚙️  Configurando variables de entorno..." -ForegroundColor Yellow

# Backend .env
if (!(Test-Path "backend\.env")) {
    Copy-Item "backend\env.example" "backend\.env"
    Write-Host "✅ Creado backend\.env desde env.example" -ForegroundColor Green
    Write-Host "📝 Recuerda configurar MONGODB_URI en backend\.env" -ForegroundColor Cyan
} else {
    Write-Host "ℹ️  backend\.env ya existe" -ForegroundColor Blue
}

# Frontend .env
if (!(Test-Path "frontend\.env")) {
    Copy-Item "frontend\env.example" "frontend\.env"
    Write-Host "✅ Creado frontend\.env desde env.example" -ForegroundColor Green
} else {
    Write-Host "ℹ️  frontend\.env ya existe" -ForegroundColor Blue
}

Write-Host ""
Write-Host "🎉 ¡Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Configura MONGODB_URI en backend\.env" -ForegroundColor White
Write-Host "2. Ejecuta 'npm run dev' en backend\ para iniciar el servidor" -ForegroundColor White
Write-Host "3. Ejecuta 'npm run dev' en frontend\ para iniciar el cliente" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor Cyan
Write-Host "  Backend: http://localhost:3001" -ForegroundColor White
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "📚 Lee el README.md para más información" -ForegroundColor Cyan


