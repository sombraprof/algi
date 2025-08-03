$Port = 8000
$ServeDir = $PSScriptRoot

# 1️⃣ Matar qualquer instância do Firefox
Get-Process firefox -ErrorAction SilentlyContinue | Stop-Process -Force

# 2️⃣ Matar processo que usa a porta 8000, se existir
$proc = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($proc) {
    Stop-Process -Id $proc.OwningProcess -Force
}

# 3️⃣ Iniciar servidor HTTP em background
Start-Job { python -m http.server 8000 --bind 127.0.0.1 --directory $using:ServeDir --cgi }

# 4️⃣ Aguardar o servidor subir
Start-Sleep -Seconds 2

# 5️⃣ Abrir Firefox em aba privada
Start-Process "firefox.exe" "--private-window http://127.0.0.1:8000"