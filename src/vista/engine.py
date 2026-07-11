"""
engine.py

Main VISTA analysis engine.
"""

from vista.intake import create_variant
from vista.normalizer import VariantNormalizer
from vista.acmg import ACMGEngine
from vista.classifier import VariantClassifier
from vista.report import ReportGenerator
from vista.clinvar import ClinVarClient
from vista.pubmed import PubMedClient
from vista.services.ensembl import EnsemblService
from vista.phenotypes import PhenotypeExtractor


class VistaEngine:

    def __init__(self):

        self.normalizer = VariantNormalizer()
        self.clinvar = ClinVarClient()
        self.pubmed = PubMedClient()
        self.acmg = ACMGEngine()
        self.classifier = VariantClassifier()
        self.report = ReportGenerator()
        self.ensembl = EnsemblService()
        self.phenotypes = PhenotypeExtractor()

    def analyze(
        self,
        gene: str,
        transcript: str,
        hgvs: str,
        classification: str = "Unknown",
        zygosity: str = "Unknown",
        phenotype: str = "",
        inheritance: str = "",
    ) -> dict:

        variant = create_variant(
            gene=gene,
            transcript=transcript,
            hgvs=hgvs,
            classification=classification,
            zygosity=zygosity,
            phenotype=phenotype,
            inheritance=inheritance,
        )

        variant = self.normalizer.normalize(variant)
        
        variant = self.clinvar.annotate(variant)
        
        variant = self.pubmed.annotate(variant)
        
        variant = self.phenotypes.annotate(variant)
        
        variant = self.acmg.classify(variant)

        variant = self.classifier.classify(variant)
        
        print(variant.gnomad)
        report = self.report.generate(variant)
        return report