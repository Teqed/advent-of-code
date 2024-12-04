pub fn part_a(input: &str) -> i32 {
    let (mut left_list, mut right_list): (Vec<i32>, Vec<i32>) = input
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|num| num.parse().expect("should be a number"))
                .collect::<Vec<i32>>()
        })
        .map(|parts| (parts[0], parts[1]))
        .unzip();
    left_list.sort();
    right_list.sort();
    left_list
        .iter()
        .zip(right_list.iter())
        .map(|(left, right)| (left - right).abs())
        .sum()
}

pub fn part_b(input: &str) -> i32 {
    let (left_list, right_list): (Vec<i32>, Vec<i32>) = input
        .lines()
        .map(|line| {
            let parts: Vec<i32> = line
                .split_whitespace()
                .map(|num| num.parse().expect("should be a number"))
                .collect();
            (parts[0], parts[1])
        })
        .unzip();
    let mut right_count = std::collections::HashMap::new();
    for right in right_list {
        *right_count.entry(right).or_insert(0) += 1;
    }
    left_list
        .iter()
        .map(|left| left * right_count.get(left).unwrap_or(&0))
        .sum()
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 1;
    println!("Day {} Example Part A: {}", day, part_a(example_input));
    println!("Day {} Part A: {}", day, part_a(input));
    println!("Day {} Example Part B: {}", day, part_b(example_input));
    println!("Day {} Part B: {}", day, part_b(input));
}
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_a_example() {
        let example_input = include_str!("../input_example.txt");
        assert_eq!(part_a(example_input), 11);
    }

    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 2113135);
    }

    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 31);
    }

    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 19097157);
    }
}
