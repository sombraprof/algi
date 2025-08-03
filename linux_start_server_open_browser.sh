#!/bin/bash

PORT=8000
SERVE_DIR="$(dirname "$0")" # raiz do projeto

# 1️⃣ Matar qualquer instância do Firefox
pkill -f firefox

# 2️⃣ Checar se a porta está ocupada e matar processo se necessário
if lsof -i :$PORT >/dev/null 2>&1; then
  echo "⚠️ Porta $PORT já está em uso. Matando processo..."
  kill -9 $(lsof -t -i :$PORT)
  sleep 1
fi

# 3️⃣ Iniciar o servidor HTTP
python3 -m http.server $PORT --bind 127.0.0.1 --directory "$SERVE_DIR" --cgi &
SERVER_PID=$!

# 4️⃣ Esperar o servidor subir
sleep 2

# 5️⃣ Abrir Firefox em aba privada
firefox --private-window http://127.0.0.1:$PORT

