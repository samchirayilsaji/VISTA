from vista.intake import create_variant
from vista.normalizer import VariantNormalizer


def test_normalizer():

    variant = create_variant(
        gene="PLIN4",
        transcript="NM_001367868.2",
        hgvs="c.3702+5G>A",
        classification="VUS",
        zygosity="Heterozygous",
        phenotype="Myopathy",
        inheritance="Autosomal dominant",
    )

    normalizer = VariantNormalizer()

    variant = normalizer.normalize(variant)

    assert variant.chromosome == "19"
    assert variant.position == 4508763
    assert variant.ref == "G"
    assert variant.alt == "A"
    assert variant.genome_build == "GRCh38"