"""
classifier.py

Combines ACMG evidence into a final classification.
"""

from vista.variant import Variant


class VariantClassifier:

    def classify(self, variant: Variant) -> Variant:

        score = 0

        for evidence in variant.acmg.values():

            if not evidence["triggered"]:
                continue

            strength = evidence["strength"]

            if strength == "Very Strong":
                score += 8

            elif strength == "Strong":
                score += 4

            elif strength == "Moderate":
                score += 2

            elif strength == "Supporting":
                score += 1

            elif strength == "Stand-alone":
                score -= 8

        if score >= 10:
            classification = "Pathogenic"

        elif score >= 6:
            classification = "Likely Pathogenic"

        elif score <= -8:
            classification = "Benign"

        else:
            classification = "VUS"

        variant.report["classification"] = classification
        variant.report["score"] = score

        return variant