#!/bin/bash
# EK.OS — Deploy Backend to Cloud Run
# Usage: ./scripts/deploy-backend.sh

set -e

PROJECT_ID="ekos-prod"
REGION="us-central1"
SERVICE="ekos-backend"
IMAGE="us-central1-docker.pkg.dev/${PROJECT_ID}/ekos/${SERVICE}"

echo "Building Docker image..."
docker build -t ${IMAGE} src/backend/

echo "Pushing to Artifact Registry..."
docker push ${IMAGE}

echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE} \
  --image ${IMAGE} \
  --region ${REGION} \
  --project ${PROJECT_ID} \
  --port 8004 \
  --allow-unauthenticated \
  --set-env-vars="API_ENV=production"

echo "Verifying deployment..."
URL=$(gcloud run services describe ${SERVICE} --region ${REGION} --project ${PROJECT_ID} --format='value(status.url)')
curl -s "${URL}/api/health" | python3 -m json.tool

echo "Deploy complete: ${URL}"
