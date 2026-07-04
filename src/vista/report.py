"""
report.py

Creates the final VISTA report.
"""

from datetime import datetime

from vista.variant import Variant


class ReportGenerator:

    def generate(self, variant: Variant) -> dict:
        """
        Generate the final VISTA report.
        """

        report = {
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "vista_version": "0.1.0",
            },

            "variant": {
                "gene": variant.gene,
                "transcript": variant.transcript,
                "hgvs": variant.hgvs,
                "zygosity": variant.zygosity,
                "phenotype": variant.phenotype,
                "inheritance": variant.inheritance,
            },

            "coordinates": {
                "chromosome": variant.chromosome,
                "position": variant.position,
                "ref": variant.ref,
                "alt": variant.alt,
                "genome_build": variant.genome_build,
            },

            "population": {
                "gnomad": variant.gnomad,
            },

            "clinical": {
                "clinvar": variant.clinvar,
                "pubmed": {
                    "count": len(variant.pubmed),
                    "papers": variant.pubmed,
                },
            },

            "acmg": variant.acmg,

            "classification": {
                "label": variant.report["classification"],
                "score": variant.report["score"],
            },
        }

        return report