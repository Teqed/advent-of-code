pub fn part_a(input: &str) -> i32 {
    let mut left_list: Vec<i32> = Vec::new();
    let mut right_list: Vec<i32> = Vec::new();
    for line in input.lines() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        left_list.push(parts[0].parse().unwrap());
        right_list.push(parts[1].parse().unwrap());
    }
    left_list.sort();
    right_list.sort();
    let mut sum = 0;
    for (left, right) in left_list.iter().zip(right_list.iter()) {
        sum += (left - right).abs();
    }

    sum
}

pub fn part_b(input: &str) -> i32 {
    let mut left_list: Vec<i32> = Vec::new();
    let mut right_list: Vec<i32> = Vec::new();
    for line in input.lines() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        left_list.push(parts[0].parse().unwrap());
        right_list.push(parts[1].parse().unwrap());
    }
    left_list.sort();
    right_list.sort();
    let mut sum = 0;
    for left in left_list.iter() {
        let mut count = 0;
        for right in right_list.iter() {
            if left == right {
                count += 1;
            }
        }
        sum += left * count;
    }

    sum
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

// #[cfg(test)]
// mod tests {
// }
