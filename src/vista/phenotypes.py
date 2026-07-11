"""
phenotypes.py

Extracts reported clinical phenotypes from PubMed papers.
"""

from collections import Counter

from vista.variant import Variant


class PhenotypeExtractor:

    """
    Extract phenotypes from PubMed titles.

    V1:
    Uses simple keyword matching.

    Future:
    Replace with LLM/HPO extraction.
    """

    PHENOTYPES = {
        "Muscle weakness": [
            "muscle weakness",
            "weakness",
        ],
        "Adult onset": [
            "adult onset",
        ],
        "Elevated CK": [
            "elevated ck",
            "creatine kinase",
        ],
        "Rimmed vacuoles": [
            "rimmed vacuoles",
            "rimmed vacuole",
        ],
        "Distal myopathy": [
            "distal myopathy",
        ],
        "Vacuolar myopathy": [
            "vacuolar myopathy",
        ],
        "Autophagic vacuoles": [
            "autophagic vacuoles",
            "autophagic vacuolation",
        ],
    }

    def annotate(self, variant: Variant) -> Variant:

        counter = Counter()

        for paper in variant.pubmed:

            text = (
                paper["title"] + " " + paper["journal"]
            ).lower()
            print(text)

            for phenotype, keywords in self.PHENOTYPES.items():

                if any(keyword in text for keyword in keywords):
                    print(f"Matched : {phenotype}")
                    counter[phenotype] += 1

        variant.phenotypes = [
            {
                "name": phenotype,
                "count": count,
            }
            for phenotype, count in counter.most_common()
        ]

        return variant