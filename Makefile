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

log:
	docker-compose logs -f app

.PHONY: all-logs

all-logs:
	docker-compose logs -f

.PHONY: generate-logs

generate-logs:
	docker-compose logs --no-color --tail=5000 app > logs.txt

.PHONY: bash

bash:
	docker-compose exec app bash

.PHONY: remove-images

remove-images:
	docker system prune -a --volumes
