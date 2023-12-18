def partA(input):
    class Round:
        def __init__(self, red, green, blue):
            self.red = red
            self.green = green
            self.blue = blue

    class Game:
        def __init__(self, id, rounds):
            self.id = id
            self.rounds = rounds

    input = input.split("\n")
    redCubeMax = 12
    greenCubeMax = 13
    blueCubeMax = 14
    sum = 0
    gameHistory = []

    for line in input:
        gameID = line.split(":")[0].split(" ")[1]
        gameHistory.append(Game(gameID, []))
        rounds = line.split(":")[1].split(";")
        for round in rounds:
            red = 0
            green = 0
            blue = 0
            for ball in round.split(","):
                if "red" in ball:
                    red = int(ball.split(" ")[1])
                elif "green" in ball:
                    green = int(ball.split(" ")[1])
                elif "blue" in ball:
                    blue = int(ball.split(" ")[1])
            gameHistory[len(gameHistory) - 1].rounds.append(Round(red, green, blue))

    possible_game_IDs = []
    def isGamePossible(game):
        for round in game.rounds:
            if round.red > redCubeMax or round.green > greenCubeMax or round.blue > blueCubeMax:
                return False
        return True
    
    for game in gameHistory:
        if isGamePossible(game):
            possible_game_IDs.append(game.id)

    for game in gameHistory:
        if game.id in possible_game_IDs:
            sum += int(game.id)

    return sum

def partB(input):
    class Round:
        def __init__(self, red, green, blue):
            self.red = red
            self.green = green
            self.blue = blue

    class Game:
        def __init__(self, id, rounds):
            self.id = id
            self.rounds = rounds

        def get_minimum_cubes(self):
            red = 0
            green = 0
            blue = 0
            for round in self.rounds:
                red = max(red, round.red)
                green = max(green, round.green)
                blue = max(blue, round.blue)
            return red, green, blue
    input = input.split("\n")
    sum = 0
    gameHistory = []

    for line in input:
        gameID = line.split(":")[0].split(" ")[1]
        gameHistory.append(Game(gameID, []))
        rounds = line.split(":")[1].split(";")
        for round in rounds:
            red = 0
            green = 0
            blue = 0
            for ball in round.split(","):
                if "red" in ball:
                    red = int(ball.split(" ")[1])
                elif "green" in ball:
                    green = int(ball.split(" ")[1])
                elif "blue" in ball:
                    blue = int(ball.split(" ")[1])
            gameHistory[len(gameHistory) - 1].rounds.append(Round(red, green, blue))

    sets = []
    for game in gameHistory:
        sets.append(game.get_minimum_cubes())
    for set in sets:
        sum += set[0] * set[1] * set[2]

    
    return sum
