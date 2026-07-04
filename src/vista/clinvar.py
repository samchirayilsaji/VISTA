"""
clinvar.py

Client for retrieving variant information from ClinVar.
"""

import time
import requests

from vista.variant import Variant


class ClinVarClient:

    def __init__(self):
        pass

    def annotate(self, variant: Variant) -> Variant:
        """
        Annotate a Variant using ClinVar.
        """

        query = self.build_query(variant)

        response = self.search(query)

        ids = response.get("esearchresult", {}).get("idlist", [])

        if not ids:
            variant.clinvar = {
                "found": False,
                "query": query,
                "records": [],
            }
            return variant

        records = []

        for clinvar_id in ids:

            summary = self.fetch_summary(clinvar_id)

            record = self.parse_summary(summary)

            if record:
                records.append(record)

        variant.clinvar = {
            "found": len(records) > 0,
            "query": query,
            "records": records,
        }

        return variant

    def build_query(self, variant: Variant) -> str:
        """
        Build the ClinVar search query from a Variant.
        """
        return f"{variant.gene}[gene] AND {variant.hgvs}"

    def search(self, query: str) -> dict:
        """
        Search ClinVar using the NCBI E-utilities API.
        """

        url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"

        params = {
            "db": "clinvar",
            "term": query,
            "retmode": "json",
        }

        headers = {
            "User-Agent": "VISTA/0.1"
        }

        for _ in range(3):

            try:

                response = requests.get(
                    url,
                    params=params,
                    headers=headers,
                    timeout=10,
                )

                if response.status_code == 429:
                    print("ClinVar rate limited. Retrying...")
                    time.sleep(2)
                    continue

                response.raise_for_status()

                return response.json()

            except requests.RequestException as e:

                print("ClinVar search failed:", e)
                time.sleep(2)

        return {
            "esearchresult": {
                "idlist": []
            }
        }

    def fetch_summary(self, clinvar_id: str) -> dict:
        """
        Fetch a ClinVar summary using a ClinVar ID.
        """

        url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"

        params = {
            "db": "clinvar",
            "id": clinvar_id,
            "retmode": "json",
        }

        headers = {
            "User-Agent": "VISTA/0.1"
        }

        try:

            response = requests.get(
                url,
                params=params,
                headers=headers,
                timeout=10,
            )

            response.raise_for_status()

            return response.json()

        except requests.RequestException as e:

            print("ClinVar summary failed:", e)

            return {
                "result": {
                    "uids": []
                }
            }

    def parse_summary(self, summary: dict) -> dict:
        """
        Extract useful ClinVar information from an ESummary response.
        """

        uids = summary.get("result", {}).get("uids", [])

        if not uids:
            return {}

        uid = uids[0]

        record = summary["result"].get(uid)

        if not record:
            return {}

        classification = record.get("germline_classification", {})

        genes = record.get("genes", [])

        return {
            "clinvar_id": record.get("uid", ""),
            "accession": record.get("accession", ""),
            "title": record.get("title", ""),
            "classification": classification.get("description", ""),
            "review_status": classification.get("review_status", ""),
            "last_evaluated": classification.get("last_evaluated", ""),
            "gene": genes[0]["symbol"] if genes else "",
        }
