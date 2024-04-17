#!/usr/bin/env bash
set -eux

DC="docker-compose -f docker-compose.ci.yml"

ls -l

cp .env.example .env

${DC} up -d app mysql

export COMPOSE_INTERACTIVE_NO_CLI=1
