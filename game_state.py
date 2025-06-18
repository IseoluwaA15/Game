class GameState:
    def __init__(self):
        self.game_over = False
        self.turns = 0
        self.max_turns = 15  # Can be adjusted for difficulty
        self.evidence_found = []
        self.locations_visited = []
        self.interviews_conducted = []
