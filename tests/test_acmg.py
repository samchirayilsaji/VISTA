from vista.intake import create_variant
from vista.normalizer import VariantNormalizer
from vista.acmg import ACMGEngine


def test_acmg():

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

    assert variant.acmg["PM2"]["triggered"] is True
    assert variant.acmg["BA1"]["triggered"] is False
    assert variant.acmg["BS1"]["triggered"] is False
    assert variant.acmg["PVS1"]["triggered"] is False