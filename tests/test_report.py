from vista.engine import VistaEngine


def test_report():

    engine = VistaEngine()

    report = engine.analyze(
        gene="PLIN4",
        transcript="NM_001367868.2",
        hgvs="c.3702+5G>A",
        classification="VUS",
        zygosity="Heterozygous",
        phenotype="Myopathy",
        inheritance="Autosomal dominant",
    )

    assert "metadata" in report
    assert "variant" in report
    assert "coordinates" in report
    assert "population" in report
    assert "clinical" in report
    assert "acmg" in report
    assert "classification" in report