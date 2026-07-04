from vista.intake import create_variant


def test_create_variant():

    variant = create_variant(
        gene="PLIN4",
        transcript="NM_001367868.2",
        hgvs="c.3702+5G>A",
        classification="VUS",
        zygosity="Heterozygous",
        phenotype="Myopathy",
        inheritance="Autosomal dominant",
    )

    assert variant.gene == "PLIN4"
    assert variant.transcript == "NM_001367868.2"
    assert variant.hgvs == "c.3702+5G>A"

    assert variant.classification == "VUS"
    assert variant.zygosity == "Heterozygous"
    assert variant.phenotype == "Myopathy"
    assert variant.inheritance == "Autosomal dominant"