from day2 import partA, partB

day = 2
answerExample = 8
answerA = 2685
answerB = 83_707
answerExampleB = 2286

with open(f'src/day{day}/input.txt', 'r') as file:
    input = file.read()

with open(f'src/day{day}/input_example.txt', 'r') as file:
    inputExample = file.read()

def test_partA_example():
    assert partA(inputExample) == answerExample

def test_partA():
    assert partA(input) == answerA

def test_partB_example():
    assert partB(inputExample) == answerExampleB

def test_partB():
    assert partB(input) == answerB