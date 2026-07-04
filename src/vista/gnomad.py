"""
gnomad.py

Client for retrieving population frequency data from gnomAD.
"""

import requests

from vista.variant import Variant


class GnomADClient:

    def __init__(self):
        self.url = "https://gnomad.broadinstitute.org/api"

    def build_query(self, variant: Variant) -> str:
        """
        Build a GraphQL query.

        Placeholder for now.
        """

        return ""