use regex::Regex;

pub fn part_a(input: &str) -> i32 {
    Regex::new(r"mul\((\d+),(\d+)\)")
        .expect("Regex should be valid")
        .captures_iter(input)
        .map(|capture| {
            capture[1].parse::<i32>().expect("should be a number")
                * capture[2].parse::<i32>().expect("should be a number")
        })
        .sum()
}

pub fn part_b(input: &str) -> i32 {
    Regex::new(r"(mul\((\d+),(\d+)\)|do\(\)|don't\(\))")
        .expect("Regex should be valid")
        .captures_iter(input)
        .fold((0, true), |(sum, enabled), capture| match &capture[0] {
            "do()" => (sum, true),
            "don't()" => (sum, false),
            _ if enabled => {
                let x = capture[2].parse::<i32>().expect("should be a number");
                let y = capture[3].parse::<i32>().expect("should be a number");
                (sum + x * y, enabled)
            }
            _ => (sum, enabled),
        })
        .0
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 3;
    println!("Day {} Example Part A: {}", day, part_a(example_input));
    println!("Day {} Part A: {}", day, part_a(input));
    println!("Day {} Example Part B: {}", day, part_b(example_input_b));
    println!("Day {} Part B: {}", day, part_b(input));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_a_example() {
        let example_input = include_str!("../input_example.txt");
        assert_eq!(part_a(example_input), 161);
    }

    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 184576302);
    }

    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example_b.txt");
        assert_eq!(part_b(example_input_b), 48);
    }

    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 118173507);
    }
}
