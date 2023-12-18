def partA(input):
    input = input.split("\n")
    sum = 0
    for i in input:
        digits = (int(c) for c in i if c.isdigit())
        first_digit = next(digits)
        last_digit = first_digit
        while True:
            try:
                last_digit = next(digits)
            except StopIteration:
                break
        combined = first_digit * 10 + last_digit
        sum += combined
    return sum

def partB(input):
    input = input.split("\n")
    sum = 0
    digit_strings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    for i in input:
        digit_array = []
        current_index = 0
        for c in i:
            if c.isdigit():
                digit_array.append(int(c))
            elif c in "otfsen":
                foresight = i[current_index:current_index+5]
                for digit_string in digit_strings:
                    if foresight.startswith(digit_string):
                        digit_array.append(digit_strings.index(digit_string) + 1)
                        break
            current_index += 1
        first_digit = digit_array[0]
        last_digit = digit_array[-1]
        combined = first_digit * 10 + last_digit
        sum += combined
    return sum
