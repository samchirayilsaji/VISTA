from vista.variant import Variant
from vista.services.ensebl import EnsemblService


class VariantNormalizer:

    def __init__(self):

        self.service = EnsemblService()

    def normalize(self, variant: Variant) -> Variant:

        hgvs = f"{variant.transcript}:{variant.hgvs}"

        try:
            response = self.service.normalize(hgvs)
            record = response[0]
        except Exception as e:
            print("Normalization failed:", e)
            return variant
 
        variant.chromosome = record["seq_region_name"]
        variant.position = record["start"]

        ref, alt = record["allele_string"].split("/")

        variant.ref = ref
        variant.alt = alt

        variant.genome_build = record["assembly_name"]
        variant.most_severe_consequence = record.get(
            "most_severe_consequence"
        )

        colocated = record.get("colocated_variants", [])
        print(colocated)

        if colocated:
            variant.rsid = colocated[0].get("id")
            frequencies = colocated[0].get("frequencies", {})
            variant.gnomad = frequencies.get(variant.alt, {})

        return variant