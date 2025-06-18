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
        import random
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
        Character("Dr. Black", "Wealthy Host", "Secretive and sophisticated")
    ]
    return characters
