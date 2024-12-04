pub fn part_a(input: &str) -> i32 {
    let mut sum = 0;
    for line in input.lines() {
        let mut digits = line
            .chars()
            .filter(|c| c.is_ascii_digit())
            .map(|c| c.to_digit(10).expect("should be a number"));
        let first_digit = digits.next().expect("should be a number");
        let last_digit = digits.last().unwrap_or(first_digit);
        let combined = first_digit * 10 + last_digit;
        sum += combined as i32;
    }
    sum
}

pub fn part_b(input: &str) -> i32 {
    let mut sum = 0;
    let digit_strings = [
        "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    ];
    for line in input.lines() {
        let mut digit_array = Vec::new();
        for (current_index, c) in line.chars().enumerate() {
            if c.is_ascii_digit() {
                digit_array.push(c.to_digit(10).expect("should be a number"));
            } else if "otfsen".contains(c) {
                let foresight = &line[current_index..];
                for (index, digit_string) in digit_strings.iter().enumerate() {
                    if foresight.starts_with(digit_string) {
                        digit_array.push(index as u32 + 1);
                        break;
                    }
                }
            }
        }
        let first_digit = digit_array[0];
        let last_digit = *digit_array.last().unwrap_or(&first_digit);
        let combined = first_digit * 10 + last_digit;
        sum += combined as i32;
    }
    sum
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    let example_input_b = include_str!("../input_example_b.txt");
    println!("Day 1 Example Part A: {}", part_a(example_input));
    println!("Day 1 Part A: {}", part_a(input));
    println!("Day 1 Example Part B: {}", part_b(example_input_b));
    println!("Day 1 Part B: {}", part_b(input));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_a_example() {
        let example_input = include_str!("../input_example.txt");
        let example_answer_a = 142;
        assert_eq!(part_a(example_input), example_answer_a);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        let answer_a = 55029;
        assert_eq!(part_a(input), answer_a);
    }
    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example_b.txt");
        let example_answer_b = 281;
        assert_eq!(part_b(example_input_b), example_answer_b);
    }

    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        let answer_b = 55686;
        assert_eq!(part_b(input), answer_b);
    }
}
