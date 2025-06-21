import random

class Character:
    def __init__(self, name: str, occupation: str, personality: str):
        self.name = name
        self.occupation = occupation
        self.personality = personality
        self.is_alive = True
    
    def get_statement(self, murderer, murder_location, murder_weapon):
        """Generate a statement based on the character's knowledge of the crime"""
        if self == murderer:
            return self._get_murderer_statement()
        else:
            return self._get_witness_statement(murderer, murder_location, murder_weapon)
    
    def _get_murderer_statement(self):
        """Generate a deceptive statement if this character is the murderer"""
        return "I don't know anything about what happened. I was nowhere near the scene when it occurred."
    
    def _get_witness_statement(self, murderer, murder_location, murder_weapon):
        """Generate a truthful but incomplete statement about the crime"""
        statements = [
            f"I saw {murderer.name} acting suspiciously earlier.",
            f"I heard strange noises coming from the {murder_location.name}.",
            f"I noticed something that looked like {murder_weapon.name} earlier.",
            "I'm not sure if it's relevant, but something felt off that day."
        ]
        return random.choice(statements)

def generate_characters():
    """Generate a list of characters for the game"""
    characters = [
        Character("Professor Plum", "University Professor", "Intellectual and calculating"),
        Character("Miss Scarlet", "Actress", "Charming but mysterious"),
        Character("Colonel Mustard", "Retired Military Officer", "Strict and disciplined"),
        Character("Mrs. Peacock", "Socialite", "Elegant and observant"),
        Character("Mr. Green", "Businessman", "Ambitious and resourceful"),
        Character("Dr. Black", "Wealthy Host", "Secretive and sophisticated"),
        Character("Ms. Greenwood", "Botanist", "Calm and insightful"),
        Character("Mr. Adams", "Detective", "Curious and analytical"),
        Character("Dr. Springfield", "Physician", "Caring and precise"),
        Character("Madam Rosemary", "Fortune Teller", "Mysterious and wise"),
        Character("Sir Alexander", "Historian", "Knowledgeable and reserved"),
        Character("Ms. Alagor", "Artist", "Creative and eccentric")
    ]
    return characters

def pick_victims_and_suspects(characters, num_victims=4, num_suspects=6):
    """Randomly pick unique victims and suspects for the round."""
    all_characters = characters[:]
    victims = random.sample(all_characters, num_victims)
    remaining = [c for c in all_characters if c not in victims]
    suspects = random.sample(remaining, min(num_suspects, len(remaining)))
    return victims, suspects

def get_evidence():
    """Return a list of all evidence items for the game."""
    return [
        'Candlestick',
        'Rope',
        'Lead Pipe',
        'Revolver',
        'Knife',
        'Wrench',
        'Broken Glass',
        'Muddy Footprints',
        'Torn Fabric',
        'Strange Letter'
    ]

def get_case_summary(victims, suspects):
    """Return a summary string for the current round with the correct victims, suspects, and all evidence."""
    victims_str = ', '.join([v.name for v in victims])
    suspects_str = ', '.join([s.name for s in suspects])
    evidence_str = ', '.join(get_evidence())
    summary = (
        f"<h2>Case Summary</h2>"
        f"<p><b>Victims:</b> {victims_str} were found murdered!</p>"
        f"<p><b>Note:</b> Evidence suggests that the murderer acted alone.</p>"
        f"<p><b>Suspects:</b> {suspects_str}</p>"
        f"<p><b>Possible Evidence:</b> {evidence_str}</p>"
    )
    return summary

# Helper to store last round's victims and suspects
game_victims = []
game_suspects = []
