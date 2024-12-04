pub fn validate_report(report: &[i32]) -> bool {
    let direction = if report[1] > report[0] { 1 } else { -1 };
    for i in 1..report.len() {
        let diff = report[i] - report[i - 1];
        if diff.abs() < 1
            || diff.abs() > 3
            || (direction == 1 && diff < 0)
            || (direction == -1 && diff > 0)
        {
            return false;
        }
    }
    true
}

fn parse_reports(input: &str) -> Vec<Vec<i32>> {
    input
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|num| num.parse().expect("should be a number"))
                .collect()
        })
        .collect()
}

pub fn part_a(input: &str) -> i32 {
    parse_reports(input)
        .iter()
        .filter(|report| validate_report(report))
        .count() as i32
}

pub fn part_b(input: &str) -> i32 {
    parse_reports(input)
        .iter()
        .filter(|report| {
            (0..report.len()).any(|i| {
                let mut new_report = report.to_vec();
                new_report.remove(i);
                validate_report(&new_report)
            })
        })
        .count() as i32
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 2;
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
        assert_eq!(part_a(example_input), 2);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 502);
    }
    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 4);
    }
    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 544);
    }
}
