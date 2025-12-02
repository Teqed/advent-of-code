mod common;
mod part_a;
mod part_b;

use part_a::part_a;
use part_b::part_b;

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    println!("Example Part A: {}", part_a(example_input));
    println!("Part A: {}", part_a(input));
    println!("Example Part B: {}", part_b(example_input));
    println!("Part B: {}", part_b(input));
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_part_a_example() {
        assert_eq!(part_a(include_str!("../input_example.txt")), 3);
    }
    #[test]
    fn test_part_a() {
        assert_eq!(part_a(include_str!("../input.txt")), 1071);
    }
    #[test]
    fn test_part_b_example() {
        assert_eq!(part_b(include_str!("../input_example.txt")), 6);
    }
    #[test]
    fn test_part_b() {
        assert_eq!(part_b(include_str!("../input.txt")), 6700);
    }
}
