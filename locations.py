class Location:
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description
        
    def get_clues(self, is_murder_location: bool):
        """Return clues based on whether this is the murder location"""
        import random
        
        basic_observation = f"\nYou examine the {self.name}.\n{self.description}"
        
        if is_murder_location:
            murder_clues = [
                "\nYou notice signs of a struggle.",
                "\nThere are faint bloodstains that someone tried to clean up.",
                "\nSome furniture appears to have been recently moved.",
                "\nThere's a peculiar smell in the air."
            ]
            return basic_observation + random.choice(murder_clues)
        else:
            normal_clues = [
                "\nEverything appears to be in order.",
                "\nNothing seems out of place.",
                "\nYou don't notice anything unusual.",
                "\nThe room looks undisturbed."
            ]
            return basic_observation + random.choice(normal_clues)

def generate_locations():
    """Generate a list of locations for the game"""
    locations = [
        Location("Study", "A well-appointed room with walls lined with books and a large desk."),
        Location("Kitchen", "A spacious room with modern appliances and a central island."),
        Location("Conservatory", "A glass-enclosed room filled with exotic plants and comfortable seating."),
        Location("Dining Room", "An elegant room with a long table and crystal chandelier."),
        Location("Library", "A cozy room with floor-to-ceiling bookshelves and leather armchairs."),
        Location("Ballroom", "A grand room with polished floors and ornate decorations."),
        Location("Billiard Room", "A masculine room centered around a vintage billiard table."),
        Location("Lounge", "A comfortable room with plush sofas and a fireplace.")
    ]
    return locations
