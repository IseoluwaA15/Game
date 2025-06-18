import random
from typing import List, Dict
from characters import Character, generate_characters
from locations import Location, generate_locations
from evidence import Evidence, generate_evidence
from game_state import GameState

class MurderMysteryGame:
    def __init__(self):
        self.characters = generate_characters()
        self.locations = generate_locations()
        self.evidence = generate_evidence()
        self.state = GameState()
        self.murderer = None
        self.victim = None
        self.murder_weapon = None
        self.murder_location = None
        
    def setup_crime(self):
        """Set up the crime scenario randomly"""
        self.murderer = random.choice([c for c in self.characters if c.is_alive])
        possible_victims = [c for c in self.characters if c != self.murderer]
        self.victim = random.choice(possible_victims)
        self.victim.is_alive = False
        self.murder_location = random.choice(self.locations)
        self.murder_weapon = random.choice([e for e in self.evidence if e.is_weapon])
        
    def start_game(self):
        """Initialize and start the game"""
        self.setup_crime()
        print("\n=== Murder Mystery Game ===")
        print("\nA murder has occurred! As the detective, you must solve the case.")
        print(f"\nThe body of {self.victim.name} has been found in the {self.murder_location.name}.")
        self.game_loop()
    
    def game_loop(self):
        """Main game loop"""
        while not self.state.game_over:
            self.show_menu()
            choice = input("\nWhat would you like to do? (Enter the number): ")
            self.handle_choice(choice)
            
    def show_menu(self):
        """Display the main menu"""
        print("\n=== Actions ===")
        print("1. Interview a character")
        print("2. Examine a location")
        print("3. Review evidence")
        print("4. Make an accusation")
        print("5. Quit game")
            
    def handle_choice(self, choice):
        """Handle player's menu choice"""
        if choice == "1":
            self.interview_character()
        elif choice == "2":
            self.examine_location()
        elif choice == "3":
            self.review_evidence()
        elif choice == "4":
            self.make_accusation()
        elif choice == "5":
            self.state.game_over = True
            print("\nThanks for playing!")
        else:
            print("\nInvalid choice. Please try again.")
            
    def interview_character(self):
        """Allow player to interview a character"""
        print("\n=== Available Characters ===")
        alive_characters = [c for c in self.characters if c.is_alive]
        for i, character in enumerate(alive_characters, 1):
            print(f"{i}. {character.name}")
        
        try:
            choice = int(input("\nWho would you like to interview? (Enter the number): ")) - 1
            if 0 <= choice < len(alive_characters):
                character = alive_characters[choice]
                print(f"\n{character.name}: {character.get_statement(self.murderer, self.murder_location, self.murder_weapon)}")
            else:
                print("\nInvalid choice.")
        except ValueError:
            print("\nPlease enter a valid number.")
            
    def examine_location(self):
        """Allow player to examine a location"""
        print("\n=== Locations ===")
        for i, location in enumerate(self.locations, 1):
            print(f"{i}. {location.name}")
            
        try:
            choice = int(input("\nWhich location would you like to examine? (Enter the number): ")) - 1
            if 0 <= choice < len(self.locations):
                location = self.locations[choice]
                clues = location.get_clues(self.murder_location == location)
                print(f"\nExamining {location.name}...")
                print(clues)
            else:
                print("\nInvalid choice.")
        except ValueError:
            print("\nPlease enter a valid number.")
            
    def review_evidence(self):
        """Allow player to review collected evidence"""
        print("\n=== Evidence ===")
        for i, item in enumerate(self.evidence, 1):
            print(f"{i}. {item.name}")
            
        try:
            choice = int(input("\nWhich piece of evidence would you like to examine? (Enter the number): ")) - 1
            if 0 <= choice < len(self.evidence):
                item = self.evidence[choice]
                print(f"\n{item.get_description(self.murder_weapon == item)}")
            else:
                print("\nInvalid choice.")
        except ValueError:
            print("\nPlease enter a valid number.")
            
    def make_accusation(self):
        """Allow player to make an accusation"""
        print("\n=== Make an Accusation ===")
        
        # Show suspects
        print("\nSuspects:")
        alive_characters = [c for c in self.characters if c.is_alive]
        for i, character in enumerate(alive_characters, 1):
            print(f"{i}. {character.name}")
            
        # Show weapons
        print("\nPossible Weapons:")
        weapons = [e for e in self.evidence if e.is_weapon]
        for i, weapon in enumerate(weapons, 1):
            print(f"{i}. {weapon.name}")
            
        # Show locations
        print("\nLocations:")
        for i, location in enumerate(self.locations, 1):
            print(f"{i}. {location.name}")
            
        try:
            suspect_choice = int(input("\nWho do you accuse? (Enter the number): ")) - 1
            weapon_choice = int(input("What was the murder weapon? (Enter the number): ")) - 1
            location_choice = int(input("Where did the murder take place? (Enter the number): ")) - 1
            
            if (0 <= suspect_choice < len(alive_characters) and
                0 <= weapon_choice < len(weapons) and
                0 <= location_choice < len(self.locations)):
                
                accused = alive_characters[suspect_choice]
                weapon = weapons[weapon_choice]
                location = self.locations[location_choice]
                
                if (accused == self.murderer and
                    weapon == self.murder_weapon and
                    location == self.murder_location):
                    print("\nCongratulations! You solved the case!")
                else:
                    print("\nSorry, your accusation is incorrect. The case remains unsolved.")
                
                self.state.game_over = True
            else:
                print("\nInvalid choice(s).")
        except ValueError:
            print("\nPlease enter valid numbers.")

if __name__ == "__main__":
    game = MurderMysteryGame()
    game.start_game()
