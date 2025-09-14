#!/usr/bin/env bash
set -euo pipefail

# Config
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORTS=(5173 5174 5175 5176 5177 5178 5179 5180)
PRIMARY_PORT=5173

echo "🔧 Encerrando processos que estejam usando portas ${PORTS[*]}..."
for p in "${PORTS[@]}"; do
  if lsof -i :"$p" >/dev/null 2>&1; then
    pids=$(lsof -t -i :"$p" | sort -u)
    if [ -n "$pids" ]; then
      echo "  ➜ Porta $p em uso por PID(s): $pids — encerrando"
      kill -9 $pids || true
    fi
  fi
done

echo "🚀 Iniciando Vite (npm run dev) em :$PRIMARY_PORT com --strictPort e --open"
cd "$ROOT_DIR"
npm run dev -- --port "$PRIMARY_PORT" --strictPort --open
