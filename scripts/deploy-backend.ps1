# EK.OS — Deploy Backend to Cloud Run (PowerShell)
# Usage: .\scripts\deploy-backend.ps1

$ErrorActionPreference = "Stop"

$PROJECT_ID = "ekos-prod"
$REGION = "us-central1"
$SERVICE = "ekos-backend"
$IMAGE = "us-central1-docker.pkg.dev/$PROJECT_ID/ekos/$SERVICE"

Write-Host "Building Docker image..." -ForegroundColor Cyan
docker build -t $IMAGE src/backend/

Write-Host "Pushing to Artifact Registry..." -ForegroundColor Cyan
docker push $IMAGE

Write-Host "Deploying to Cloud Run..." -ForegroundColor Cyan
gcloud run deploy $SERVICE `
  --image $IMAGE `
  --region $REGION `
  --project $PROJECT_ID `
  --port 8004 `
  --allow-unauthenticated `
  --set-env-vars="API_ENV=production"

Write-Host "Verifying deployment..." -ForegroundColor Cyan
$URL = gcloud run services describe $SERVICE --region $REGION --project $PROJECT_ID --format='value(status.url)'
Invoke-RestMethod -Uri "$URL/api/health" | ConvertTo-Json

Write-Host "Deploy complete: $URL" -ForegroundColor Green
