#!/usr/bin/env bash
set -e
curl -fsS http://localhost:5000/api/health
echo
curl -fsS http://localhost:5000/api/products/iphone-17-pro
echo
