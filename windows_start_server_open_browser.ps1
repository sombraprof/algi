${Ports} = 5173..5180
${PrimaryPort} = 5173
${RootDir} = $PSScriptRoot

Write-Host "Encerrando processos nas portas $($Ports -join ', ')..."

foreach ($p in $Ports) {
  try {
    $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($conns) {
      $pids = $conns | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique
      foreach ($pid_ in $pids) {
        try {
          Write-Host "  Porta $p em uso por PID $pid_ - encerrando"
          Stop-Process -Id $pid_ -Force -ErrorAction SilentlyContinue
        } catch {}
      }
    }
  } catch {}
}

Write-Host "Iniciando Vite (npm run dev) em :$PrimaryPort com --strictPort e --open"
Set-Location $RootDir

# Localiza o executável do npm priorizando 'Application' (ex.: npm.cmd) para evitar bloqueio por ExecutionPolicy do npm.ps1
$npmCmd = $null
$cmd = Get-Command npm.cmd -CommandType Application -ErrorAction SilentlyContinue
if (-not $cmd) { $cmd = Get-Command npm -CommandType Application -ErrorAction SilentlyContinue }
if (-not $cmd) { $cmd = Get-Command npm.exe -CommandType Application -ErrorAction SilentlyContinue }
if ($cmd) { $npmCmd = $cmd.Source }

if (-not $npmCmd) {
  Write-Error "npm não encontrado no PATH. Instale o Node.js (que inclui o npm) ou reinicie o terminal/PC para aplicar o PATH."
  exit 1
}

# Executa no mesmo console, aguardando o término
& $npmCmd run dev -- --port $PrimaryPort --strictPort --open
