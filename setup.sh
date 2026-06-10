#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/TaskManager-Backend"
FRONTEND_DIR="$ROOT_DIR/TaskManager-Frontend"
SEED=false

for arg in "$@"; do
  case "$arg" in
    --seed) SEED=true ;;
    -h|--help)
      echo "Usage: ./setup.sh [--seed]"
      echo ""
      echo "  --seed   Populate the database with sample tasks"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg"
      echo "Run ./setup.sh --help for usage."
      exit 1
      ;;
  esac
done

copy_env() {
  local dir="$1"
  local name="$2"

  if [ -f "$dir/.env" ]; then
    echo "  $name: .env already exists, skipping"
  elif [ -f "$dir/.env.example" ]; then
    cp "$dir/.env.example" "$dir/.env"
    echo "  $name: created .env from .env.example"
  else
    echo "  $name: warning — no .env.example found"
  fi
}

echo ""
echo "  Task Manager Setup"
echo "  =================="
echo ""

echo "-> Setting up environment files..."
copy_env "$BACKEND_DIR" "Backend"
copy_env "$FRONTEND_DIR" "Frontend"
echo ""

echo "-> Installing backend dependencies..."
(cd "$BACKEND_DIR" && npm install)
echo ""

echo "-> Installing frontend dependencies..."
(cd "$FRONTEND_DIR" && npm install)
echo ""

if [ "$SEED" = true ]; then
  echo "-> Seeding database..."
  (cd "$BACKEND_DIR" && npm run seed)
  echo ""
fi

echo "  All set! Your app is ready to run."
echo ""
echo "  Backend:  cd TaskManager-Backend && npm run dev"
echo "  Frontend: cd TaskManager-Frontend && npm run dev"
echo ""
echo "  Backend  -> http://localhost:5000"
echo "  Frontend -> http://localhost:5173"
echo ""

if [ "$SEED" = true ]; then
  echo "  Demo login: demo@taskmanager.com / demo123"
  echo ""
fi
