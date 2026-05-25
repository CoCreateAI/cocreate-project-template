# {{PROJECT_NAME}} — FastAPI entrypoint (placeholder)
#
# Para rodar: uvicorn main:app --reload --port 8000

from fastapi import FastAPI

app = FastAPI(
    title="{{PROJECT_NAME}} API",
    description="{{DESCRIPTION}}",
    version="0.1.0",
)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "{{project_name}}"}
