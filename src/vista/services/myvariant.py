import requests


class MyVariantService:

    BASE_URL = "https://myvariant.info/v1"

    def lookup(self, rsid: str) -> dict:

        response = requests.get(
            f"{self.BASE_URL}/query",
            params={
                "q": rsid,
                "scopes": "dbsnp.rsid",
                "fields": "cadd",
            },
            timeout=30,
        )

        print("Status:", response.status_code)
        print("Response:", response.text)

        response.raise_for_status()

        return response.json()