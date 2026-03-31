# EK.OS — Enterprise Knowledge Operation System
# FastAPI entrypoint (placeholder)
#
# Para rodar: uvicorn main:app --reload --port 8004

from fastapi import FastAPI

app = FastAPI(
    title="EK.OS API",
    description="Enterprise Knowledge Operation System — Inteligencia Organizacional Proativa",
    version="0.1.0",
)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "ekos"}
