"""
variant.py

Core Variant object used throughout VISTA.

Every module (ClinVar, PubMed, ACMG, etc.)
adds information to this object.
"""

from dataclasses import dataclass, field
from typing import Optional, Dict, List


@dataclass
class Variant:
    """
    Represents a single genetic variant.

    Initially contains only the information
    supplied by the user or clinical report.

    As VISTA processes the variant,
    additional evidence is added.
    """

    # --------------------------
    # Basic Information
    # --------------------------

    gene: str
    hgvs: str

    transcript: Optional[str] = None
    classification: Optional[str] = None
    zygosity: Optional[str] = None
    phenotype: Optional[str] = None
    inheritance: Optional[str] = None
    chromosome: str | None = None
    position: int | None = None
    ref: str | None = None
    alt: str | None = None
    genome_build: str | None = None
    
    rsid: str | None = None
    most_severe_consequence: str | None = None

    # --------------------------
    # Evidence collected later
    # --------------------------

    clinvar: Dict = field(default_factory=dict)

    gnomad: Dict = field(default_factory=dict)

    predictions: Dict = field(default_factory=dict)

    pubmed: List = field(default_factory=list)

    acmg: Dict = field(default_factory=dict)

    report: Dict = field(default_factory=dict)