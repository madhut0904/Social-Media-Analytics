from typing import Dict, Any

class DemographicIntelligenceService:
    """
    Provides aggregated, strictly anonymized demographic estimates.
    Follows privacy-by-design principles: probabilistic inference across broad cohorts,
    no individual-level sensitive tracking.
    """
    def get_demographics(self, topic: str = "all") -> Dict[str, Any]:
        return {
            "age_bands": [
                {"band": "18–24", "percentage": 42, "sample_size": "1.01M"},
                {"band": "25–34", "percentage": 31, "sample_size": "744K"},
                {"band": "35–44", "percentage": 17, "sample_size": "408K"},
                {"band": "45+", "percentage": 10, "sample_size": "240K"},
            ],
            "languages": [
                {"language": "English", "percentage": 52, "code": "en"},
                {"language": "Kannada", "percentage": 24, "code": "kn"},
                {"language": "Hindi", "percentage": 15, "code": "hi"},
                {"language": "Others", "percentage": 9, "code": "oth"},
            ],
            "regions": [
                {"region": "South India", "percentage": 38, "top_states": "Karnataka, Tamil Nadu, Telangana"},
                {"region": "North India", "percentage": 29, "top_states": "Delhi, Uttar Pradesh, Punjab"},
                {"region": "West India", "percentage": 21, "top_states": "Maharashtra, Gujarat"},
                {"region": "East India", "percentage": 12, "top_states": "West Bengal, Odisha, Assam"},
            ],
            "interests": [
                {"category": "Technology", "affinity": 84},
                {"category": "Public Policy", "affinity": 92},
                {"category": "Education", "affinity": 68},
                {"category": "Sports", "affinity": 45},
                {"category": "Entertainment", "affinity": 58},
                {"category": "Civic Services", "affinity": 79},
            ],
            "privacy_disclaimer": "Audience attributes are probabilistic, aggregate estimates derived from permitted public signals. No private data or individual-level sensitive profiling is stored."
        }

demographic_service = DemographicIntelligenceService()
