$Ports = 5173..5180
$PrimaryPort = 5173
$RootDir = $PSScriptRoot

Write-Host "🔧 Encerrando processos nas portas $($Ports -join ', ')..."

foreach ($p in $Ports) {
  try {
    $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($conns) {
      $pids = $conns | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique
      foreach ($pid in $pids) {
        try {
          Write-Host "  ➜ Porta $p em uso por PID $pid — encerrando"
          Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        } catch {}
      }
    }
  } catch {}
}

Write-Host "🚀 Iniciando Vite (npm run dev) em :$PrimaryPort com --strictPort e --open"
Set-Location $RootDir
Start-Process -FilePath "npm" -ArgumentList @("run","dev","--","--port","$PrimaryPort","--strictPort","--open") -NoNewWindow -Wait
