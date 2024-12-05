pub fn part_a(input: &str) -> i32 {
    let (updates, rules) = process_input(input);
    check_updates(updates, rules, false)
}

pub fn part_b(input: &str) -> i32 {
    let (updates, rules) = process_input(input);
    check_updates(updates, rules, true)
}

fn process_input(input: &str) -> (Vec<Vec<i32>>, Vec<(i32, i32)>) {
    input.lines().fold(
        (Vec::new(), Vec::new()),
        |(mut updates, mut rules), line| {
            if line.is_empty() {
                return (updates, rules);
            }
            if line.contains(',') {
                updates.push(
                    line.split(',')
                        .map(|x| x.parse().expect("should parse an update"))
                        .collect(),
                );
            } else {
                let mut parts = line.split('|');
                rules.push((
                    parts
                        .next()
                        .expect("first segment")
                        .parse()
                        .expect("parse number"),
                    parts
                        .next()
                        .expect("second segment")
                        .parse()
                        .expect("parse number"),
                ));
            }
            (updates, rules)
        },
    )
}

fn find_rule_positions(update: &[i32], a: i32, b: i32) -> (usize, usize) {
    let pos_a = update.iter().position(|&x| x == a).expect("find 'a'");
    let pos_b = update.iter().position(|&x| x == b).expect("find 'b'");
    (pos_a, pos_b)
}

fn check_updates(updates: Vec<Vec<i32>>, rules: Vec<(i32, i32)>, part_b: bool) -> i32 {
    updates.into_iter().fold(0, |sum, mut update| {
        let mut valid = true;
        for &(a, b) in &rules {
            if update.contains(&a) && update.contains(&b) {
                let (pos_a, pos_b) = find_rule_positions(&update, a, b);
                if pos_a > pos_b {
                    valid = false;
                    if part_b {
                        loop {
                            valid = true;
                            for &(a, b) in &rules {
                                if update.contains(&a) && update.contains(&b) {
                                    let (pos_a, pos_b) = find_rule_positions(&update, a, b);
                                    if pos_a > pos_b {
                                        valid = false;
                                        update.swap(pos_a, pos_b);
                                        break;
                                    }
                                }
                            }
                            if valid {
                                return sum + update[update.len() / 2];
                            }
                        }
                    }
                    break;
                }
            }
        }
        if valid && !part_b {
            sum + update[update.len() / 2]
        } else {
            sum
        }
    })
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 5;
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
        assert_eq!(part_a(example_input), 143);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 4872);
    }
    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 123);
    }
    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 5564);
    }
}
