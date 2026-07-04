"""
predictions.py

Computational prediction evidence.
"""

from vista.variant import Variant
from vista.services.myvariant import MyVariantService


class PredictionEngine:

    def __init__(self):
        self.myvariant = MyVariantService()

    def annotate(self, variant: Variant) -> Variant:

        print("RSID:", variant.rsid)

        response = self.myvariant.lookup(variant.rsid)

        print(response)

        return variant