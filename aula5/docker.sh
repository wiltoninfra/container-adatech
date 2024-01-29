#!/bin/bash
TIMESTAMP=$(date '+%Y%m%d%H%M%S')
DOCKER_USERNAME=your-docker-hub-username

echo "Building Docker images..."
docker build -t $DOCKER_USERNAME/api:$TIMESTAMP ./api
docker build -t $DOCKER_USERNAME/frontend:$TIMESTAMP ./frontend
docker build -t $DOCKER_USERNAME/worker:$TIMESTAMP ./worker
echo "Pushing Docker images to Docker Hub..."
docker push $DOCKER_USERNAME/api:$TIMESTAMP
docker push $DOCKER_USERNAME/frontend:$TIMESTAMP
docker push $DOCKER_USERNAME/worker:$TIMESTAMP