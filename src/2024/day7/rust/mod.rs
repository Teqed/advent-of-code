struct TestCase {
    test_val: i64,
    nums: Vec<i64>,
}

pub fn part_a(input: &str) -> i64 {
    parse_input(input).iter()
        .filter_map(|test_case| if can_create(&test_case.test_val, &test_case.nums, false) { Some(test_case.test_val) } else { None })
        .sum()
}

pub fn part_b(input: &str) -> i64 {
    parse_input(input).iter()
        .filter_map(|test_case| if can_create(&test_case.test_val, &test_case.nums, true) { Some(test_case.test_val) } else { None })
        .sum()
}

fn parse_input(input: &str) -> Vec<TestCase> {
    input.lines()
        .filter_map(|line| {
            let parts: Vec<_> = line.split(": ").collect();
            parts[0].parse::<i64>().map_or(None, |test_val| {
                let nums = parts[1].split_whitespace()
                    .filter_map(|s| s.parse::<i64>().ok())
                    .collect();
                Some(TestCase { test_val, nums })
            })
        })
        .collect()
}

fn can_create(test_val: &i64, nums: &[i64], is_part_b: bool) -> bool {
    fn evaluate(expr: &[i64], acc: i64, is_part_b: bool, test_val: i64) -> Vec<i64> {
        if expr.is_empty() {
            return vec![acc];
        }
        let first = expr[0];
        let rest = &expr[1..];
        let mut results = Vec::new();

        if acc + first - 1 > test_val {
            return results;
        }

        results.extend(evaluate(rest, acc + first, is_part_b, test_val));
        results.extend(evaluate(rest, acc * first, is_part_b, test_val));

        if is_part_b {
            match format!("{}{}", acc, first).parse::<i64>() {
                Ok(concat_result) if concat_result <= test_val => {
                    results.extend(evaluate(rest, concat_result, is_part_b, test_val));
                }
                _ => {}
            }
        }

        results
    }

    if nums.is_empty() {
        return *test_val == 0;
    }

    let first_num = nums[0];
    let options = evaluate(&nums[1..], first_num, is_part_b, *test_val);
    options.contains(test_val)
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 7;
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
        assert_eq!(part_a(example_input), 3749);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 3312271365652);
    }
    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 11387);
    }
    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 509463489296712);
    }
}
