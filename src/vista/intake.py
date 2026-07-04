"""
intake.py

Creates Variant objects from user supplied information.
"""

from vista.variant import Variant


def create_variant(
    gene: str,
    transcript: str,
    hgvs: str,
    classification: str,
    zygosity: str,
    phenotype: str,
    inheritance: str,
):
    """
    Creates and returns a Variant object.
    """

    return Variant(
        gene=gene,
        hgvs=hgvs,
        transcript=transcript,
        classification=classification,
        zygosity=zygosity,
        phenotype=phenotype,
        inheritance=inheritance,
    )