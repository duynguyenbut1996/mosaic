deploy-server:
	git pull
	docker-compose down
	docker-compose up -d --build

run-server:
	docker start mosaic
	npm run watch
