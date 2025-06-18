class Evidence:
    def __init__(self, name: str, description: str, is_weapon: bool = False):
        self.name = name
        self.description = description
        self.is_weapon = is_weapon
        
    def get_description(self, is_murder_weapon: bool):
        """Return description based on whether this is the murder weapon"""
        import random
        
        basic_desc = f"\nYou examine the {self.name}.\n{self.description}"
        
        if self.is_weapon and is_murder_weapon:
            weapon_clues = [
                "\nYou notice traces that someone tried to clean it recently.",
                "\nThere are subtle signs of recent use.",
                "\nSomething about it seems suspicious.",
                "\nIt feels like this could be important evidence."
            ]
            return basic_desc + random.choice(weapon_clues)
        else:
            normal_desc = [
                "\nNothing unusual stands out about it.",
                "\nIt appears to be ordinary.",
                "\nYou don't notice anything suspicious about it.",
                "\nIt seems to be a normal object."
            ]
            return basic_desc + random.choice(normal_desc)

def generate_evidence():
    """Generate a list of evidence items for the game"""
    evidence = [
        Evidence("Candlestick", "A heavy brass candlestick with ornate decorations.", True),
        Evidence("Rope", "A length of sturdy rope with unusual knots.", True),
        Evidence("Lead Pipe", "A section of old lead piping, surprisingly heavy.", True),
        Evidence("Revolver", "An antique revolver, well-maintained and loaded.", True),
        Evidence("Knife", "A sharp kitchen knife with a wooden handle.", True),
        Evidence("Wrench", "A large wrench that could do significant damage.", True),
        Evidence("Broken Glass", "Shards from what appears to be a drinking glass.", False),
        Evidence("Muddy Footprints", "Distinctive shoe prints tracked across the floor.", False),
        Evidence("Torn Fabric", "A piece of expensive-looking cloth.", False),
        Evidence("Strange Letter", "A partially burned letter with mysterious contents.", False)
    ]
    return evidence
