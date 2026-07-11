from vista.services.ensembl import EnsemblService
import json

service = EnsemblService()

data = service.normalize("NM_001289127.2:c.3702+5G>A")

print(json.dumps(data, indent=2))