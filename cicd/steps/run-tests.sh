#!/usr/bin/env bash
set -eux

DC="docker-compose -f docker-compose.ci.yml"

docker ps

${DC} exec -T app npm run test
