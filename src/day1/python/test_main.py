from main import partA, partB

day = 1
answerExample = 142
answerA = 55_029
answerB = 55_686
answerExampleB = 281

with open(f'src/day{day}/input.txt', 'r') as file:
    input = file.read()

with open(f'src/day{day}/input_example.txt', 'r') as file:
    inputExample = file.read()

with open(f'src/day{day}/input_example_b.txt', 'r') as file:
    inputExampleB = file.read()

def test_partA_example():
    assert partA(inputExample) == answerExample

def test_partA():
    assert partA(input) == answerA

def test_partB_example():
    assert partB(inputExampleB) == answerExampleB

def test_partB():
    assert partB(input) == answerB