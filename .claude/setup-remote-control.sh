#!/bin/bash
# Claude Remote Control Setup
# Auto-connects to: phoenixdigitec3@gmail.com

set -e

EMAIL="phoenixdigitec3@gmail.com"

echo "[Claude Remote Control] Starting setup..."
echo "[Claude Remote Control] Connecting to: $EMAIL"

# Step 1: Install graphify
if ! command -v graphify &> /dev/null; then
  echo "[graphify] Installing graphifyy..."
  pip3 install graphifyy
else
  echo "[graphify] Already installed, skipping pip3 install."
fi

# Step 2: graphify install
echo "[graphify] Running: graphify install"
graphify install

# Step 3: graphify claude install with email
echo "[graphify] Running: graphify claude install"
graphify claude install --email "$EMAIL" --remote-control

echo "[Claude Remote Control] Setup complete. Connected to $EMAIL"
