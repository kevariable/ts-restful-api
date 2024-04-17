#!/usr/bin/env bash
set -eux

DC="docker-compose -f docker-compose.ci.yml"

ls -l

${DC} up -d app mysql

${DC} exec app npm prisma generate

export COMPOSE_INTERACTIVE_NO_CLI=1
