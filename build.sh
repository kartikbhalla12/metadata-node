#!/bin/bash

# Set variables
TAG="latest"
DOCKER_REGISTRY="registry.services.home.kartikbhalla.dev"
DOCKER_IMAGE_NAME="metadata-node"

# Build the Docker image
echo "Building Docker image..."
docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${TAG} .

# Push the image to registry
echo "Pushing image to registry..."
docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${TAG}

echo "Build and push completed successfully!" 