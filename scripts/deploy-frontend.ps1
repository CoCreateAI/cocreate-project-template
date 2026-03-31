# EK.OS — Deploy Frontend to Cloud Run (PowerShell)
# Usage: .\scripts\deploy-frontend.ps1 -BackendUrl <URL>

param(
    [Parameter(Mandatory=$true)]
    [string]$BackendUrl
)

$ErrorActionPreference = "Stop"

$PROJECT_ID = "ekos-prod"
$REGION = "us-central1"
$SERVICE = "ekos-frontend"
$IMAGE = "us-central1-docker.pkg.dev/$PROJECT_ID/ekos/$SERVICE"

Write-Host "Building Docker image..." -ForegroundColor Cyan
docker build -t $IMAGE --build-arg NEXT_PUBLIC_API_URL=$BackendUrl src/frontend/

Write-Host "Pushing to Artifact Registry..." -ForegroundColor Cyan
docker push $IMAGE

Write-Host "Deploying to Cloud Run..." -ForegroundColor Cyan
gcloud run deploy $SERVICE `
  --image $IMAGE `
  --region $REGION `
  --project $PROJECT_ID `
  --port 3000 `
  --allow-unauthenticated

Write-Host "Verifying deployment..." -ForegroundColor Cyan
$URL = gcloud run services describe $SERVICE --region $REGION --project $PROJECT_ID --format='value(status.url)'
Invoke-WebRequest -Uri $URL -UseBasicParsing | Select-Object StatusCode

Write-Host "Deploy complete: $URL" -ForegroundColor Green
