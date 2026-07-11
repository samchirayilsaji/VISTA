from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from fastapi import FastAPI
from vista.engine import VistaEngine
from api.models import AnalyzeRequest

app = FastAPI(
    title="VISTA API",
    version="0.1.0",
    description="Variant Intelligence System for Translational Analysis",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VistaEngine()


@app.get("/")
def home():
    return {
        "message": "Welcome to the VISTA API!",
        "version": "LOCAL DEBUG 123"
    }

@app.post("/analyze")
def analyze(request: AnalyzeRequest):

    report = engine.analyze(
        gene=request.gene,
        transcript=request.transcript,
        hgvs=request.hgvs,
        classification=request.classification,
        zygosity=request.zygosity,
        phenotype=request.phenotype,
        inheritance=request.inheritance,
    )

    return report