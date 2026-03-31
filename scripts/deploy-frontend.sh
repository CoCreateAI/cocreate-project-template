#!/bin/bash
# EK.OS — Deploy Frontend to Cloud Run
# Usage: ./scripts/deploy-frontend.sh <BACKEND_URL>

set -e

BACKEND_URL=${1:?"Usage: $0 <BACKEND_URL>"}
PROJECT_ID="ekos-prod"
REGION="us-central1"
SERVICE="ekos-frontend"
IMAGE="us-central1-docker.pkg.dev/${PROJECT_ID}/ekos/${SERVICE}"

echo "Building Docker image..."
docker build -t ${IMAGE} --build-arg NEXT_PUBLIC_API_URL=${BACKEND_URL} src/frontend/

echo "Pushing to Artifact Registry..."
docker push ${IMAGE}

echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE} \
  --image ${IMAGE} \
  --region ${REGION} \
  --project ${PROJECT_ID} \
  --port 3000 \
  --allow-unauthenticated

echo "Verifying deployment..."
URL=$(gcloud run services describe ${SERVICE} --region ${REGION} --project ${PROJECT_ID} --format='value(status.url)')
curl -s -o /dev/null -w "%{http_code}" "${URL}"

echo ""
echo "Deploy complete: ${URL}"
