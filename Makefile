include .env

.PHONY: build

build:
	docker-compose build

.PHONY: up

up:
	docker-compose up -d

.PHONY: recreate

recreate:
	docker-compose up --force-recreate -d

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f

.PHONY: bash

bash:
	docker-compose exec app bash
