from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    gene: str
    transcript: str
    hgvs: str

    classification: str = "Unknown"
    zygosity: str = "Unknown"
    phenotype: str = ""
    inheritance: str = ""