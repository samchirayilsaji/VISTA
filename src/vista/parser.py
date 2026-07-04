"""
parser.py

Utilities for converting laboratory reports
into Variant objects.
"""

from src.variant import Variant
def create_variant(
    gene,
    hgvs,
    transcript=None,
    classification=None,
    zygosity=None,
    phenotype=None,
):
    """
    Create a Variant object from parsed fields.
    """

    return Variant(
        gene=gene,
        hgvs=hgvs,
        transcript=transcript,
        classification=classification,
        zygosity=zygosity,
        phenotype=phenotype,
    )