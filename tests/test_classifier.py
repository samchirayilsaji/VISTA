from vista.intake import create_variant
from vista.normalizer import VariantNormalizer
from vista.acmg import ACMGEngine
from vista.classifier import VariantClassifier


def test_classifier():

    variant = create_variant(
        gene="PLIN4",
        transcript="NM_001367868.2",
        hgvs="c.3702+5G>A",
        classification="VUS",
        zygosity="Heterozygous",
        phenotype="Myopathy",
        inheritance="Autosomal dominant",
    )

    variant = VariantNormalizer().normalize(variant)
    variant = ACMGEngine().classify(variant)
    variant = VariantClassifier().classify(variant)

    assert variant.report["classification"] == "VUS"
    assert variant.report["score"] == 2