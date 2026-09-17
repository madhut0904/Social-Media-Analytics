from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseSocialConnector(ABC):
    """
    Abstract Base Class for compliant Social Media Data Connectors.
    Implements ingestion, normalization, and deduplication interface.
    No unauthorized scraping - designed for official APIs with fallback demo modes.
    """
    def __init__(self, platform_name: str):
        self.platform_name = platform_name

    @abstractmethod
    def fetch_posts(self, topic: str, limit: int = 50) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def normalize_post(self, raw_post: Dict[str, Any]) -> Dict[str, Any]:
        """Normalizes external post formats to the uniform PULSeSphere Post Schema."""
        pass
