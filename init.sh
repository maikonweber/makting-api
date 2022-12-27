#!/bin/bash
echo "Iniciando a Base"
docker-compose up -d
psql -U cook -d cook -h localhost -p 5732 -W -f init.sql