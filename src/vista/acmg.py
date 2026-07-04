"""
acmg.py

ACMG evidence engine.
"""

from vista.variant import Variant


class ACMGEngine:

    def classify(self, variant: Variant) -> Variant:
        """
        Apply ACMG evidence rules.
        """

        self.apply_ba1(variant)
        self.apply_bs1(variant)
        self.apply_pm2(variant)
        self.apply_pvs1(variant)

        return variant

    def add_evidence(
        self,
        variant: Variant,
        code: str,
        strength: str,
        triggered: bool,
        reason: str,
    ) -> None:

        variant.acmg[code] = {
            "code": code,
            "strength": strength,
            "triggered": triggered,
            "reason": reason,
        }

    def apply_ba1(self, variant: Variant) -> None:
        """
        BA1:
        Allele frequency >= 5%
        """

        freq = variant.gnomad.get("gnomade")

        if freq is None:
            return

        self.add_evidence(
            variant=variant,
            code="BA1",
            strength="Stand-alone",
            triggered=freq >= 0.05,
            reason=(
                f"Population frequency {freq:.5f}"
                + (" ≥ 5%" if freq >= 0.05 else " < 5%")
            ),
        )

    def apply_bs1(self, variant: Variant) -> None:
        """
        BS1:
        Allele frequency greater than expected for the disorder,
        but not high enough for BA1.

        Simplified threshold for V1:
        >= 0.001 (0.1%)
        """

        freq = variant.gnomad.get("gnomade")

        if freq is None:
            return

        triggered = 0.001 <= freq < 0.05

        self.add_evidence(
            variant=variant,
            code="BS1",
            strength="Strong",
            triggered=triggered,
            reason=(
                f"Population frequency {freq:.5f}"
            ),
        )

    def apply_pm2(self, variant: Variant) -> None:
        """
        PM2:
        Variant absent or extremely rare.
        """

        freq = variant.gnomad.get("gnomade")

        if freq is None:
            return

        triggered = freq < 0.0001

        self.add_evidence(
            variant=variant,
            code="PM2",
            strength="Moderate",
            triggered=triggered,
            reason=(
                f"Population frequency {freq:.5f}"
            ),
        )
    def apply_pvs1(self, variant: Variant) -> None:
        """
        PVS1:
        Canonical loss-of-function variants.
        """

        hgvs = variant.hgvs

        triggered = False

        if "+1" in hgvs or "+2" in hgvs:
            triggered = True

        elif "-1" in hgvs or "-2" in hgvs:
            triggered = True

        self.add_evidence(
            variant=variant,
            code="PVS1",
            strength="Very Strong",
            triggered=triggered,
            reason=(
                "Canonical splice-site variant"
                if triggered
                else "Variant is not at a canonical splice site"
            ),
        )