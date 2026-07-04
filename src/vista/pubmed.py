"""
Client for retrieving scientific literature from PubMed.
"""

import time
import requests

from vista.variant import Variant


class PubMedClient:
    """
    Handles communication with the PubMed database.
    """

    def __init__(self):
        pass

    def build_query(
        self,
        variant: Variant,
        strategy: str = "gene_hgvs",
    ) -> str:

        if strategy == "gene_hgvs":
            return f'{variant.gene} AND "{variant.hgvs}"'

        if strategy == "gene_phenotype":
            return f"{variant.gene} AND {variant.phenotype}"

        if strategy == "gene":
            return variant.gene

        raise ValueError(f"Unknown strategy: {strategy}")

    def search(self, query: str) -> dict:
        """
        Search PubMed using the NCBI E-utilities API.
        """

        url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"

        params = {
            "db": "pubmed",
            "term": query,
            "retmode": "json",
            "retmax": 10,
        }

        headers = {
            "User-Agent": "VISTA/0.1"
        }

        for attempt in range(3):
            try:
                response = requests.get(
                    url,
                    params=params,
                    headers=headers,
                    timeout=10,
                )

                if response.status_code == 429:
                    print("PubMed rate limited. Retrying...")
                    time.sleep(2)
                    continue

                response.raise_for_status()
                return response.json()

            except requests.RequestException as e:
                print("PubMed search failed:", e)
                time.sleep(2)

        return {
            "esearchresult": {
                "idlist": []
            }
        }

    def fetch_summary(self, pmids: list[str]) -> dict:
        """
        Fetch metadata for a list of PubMed IDs.
        """

        url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"

        params = {
            "db": "pubmed",
            "id": ",".join(pmids),
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
            print("PubMed summary failed:", e)

            return {
                "result": {
                    "uids": []
                }
            }

    def parse_summary(self, summary: dict) -> list[dict]:
        """
        Extract useful metadata from PubMed summaries.
        """

        uids = summary.get("result", {}).get("uids", [])

        if not uids:
            return []

        papers = []

        for pmid in uids:

            record = summary["result"][pmid]

            papers.append(
                {
                    "pmid": pmid,
                    "title": record.get("title", ""),
                    "journal": record.get("fulljournalname", ""),
                    "year": record.get("pubdate", ""),
                    "authors": [
                        author["name"]
                        for author in record.get("authors", [])
                    ],
                }
            )

        return papers

    def annotate(self, variant: Variant) -> Variant:
        """
        Annotate a Variant with PubMed literature.
        """

        strategies = [
            "gene_hgvs",
            "gene_phenotype",
            "gene",
        ]

        for strategy in strategies:

            query = self.build_query(
                variant,
                strategy=strategy,
            )

            response = self.search(query)

            pmids = response["esearchresult"]["idlist"]

            if pmids:

                summary = self.fetch_summary(pmids[:10])

                variant.pubmed = self.parse_summary(summary)

                return variant

        variant.pubmed = []

        return variant