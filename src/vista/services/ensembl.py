import requests
from urllib.parse import quote


class EnsemblService:

    BASE_URL = "https://rest.ensembl.org"

    def normalize(self, hgvs: str):

        hgvs = quote(hgvs, safe="")

        url = f"{self.BASE_URL}/vep/human/hgvs/{hgvs}"

        headers = {
            "Accept": "application/json"
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=30,
        )

        if not response.ok:
            print("Status:", response.status_code)
            print("Response:", response.text)
            response.raise_for_status()

        return response.json()