"""
Development setup for VISTA notebooks.

Adds the src directory to the Python path so notebooks
can import the vista package during development.
"""

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent
SRC_DIR = PROJECT_ROOT / "src"

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))