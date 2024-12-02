pub fn validate_report(report: &Vec<i32>) -> bool {
    let mut valid = true;
    let direction = {
        if report[1] > report[0] {
            1
        } else {
            -1
        }
    };
    let mut diff = 0;
    for i in 1..report.len() {
        if report[i] > report[i - 1] {
            if direction != 1 {
                valid = false;
                break;
            }
        } else {
            if direction != -1 {
                valid = false;
                break;
            }
        }
        diff = (report[i] - report[i - 1]).abs();
        if diff < 1 || diff > 3 {
            valid = false;
            break;
        }
    }
    if valid {
        return true;
    } else {
        return false;
    }
}

pub fn part_a(input: &str) -> i32 {
    let reports: Vec<Vec<i32>> = input
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|num| num.parse().unwrap())
                .collect()
        })
        .collect();
    let mut safe_reports = 0;
    for report in reports.iter() {
        if validate_report(report) {
            safe_reports += 1;
        }
    }
    safe_reports
}

pub fn part_b(input: &str) -> i32 {
    let reports: Vec<Vec<i32>> = input
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|num| num.parse().unwrap())
                .collect()
        })
        .collect();
    let mut safe_reports = 0;
    for report in reports.iter() {
        if validate_report(report) {
            safe_reports += 1;
        } else {
            let mut new_reports: Vec<Vec<i32>> = Vec::new();
            for i in 0..report.len() {
                let mut new_report = report.clone();
                new_report.remove(i);
                new_reports.push(new_report);
            }
            for new_report in new_reports.iter() {
                if validate_report(new_report) {
                    safe_reports += 1;
                    break;
                }
            }
        }
    }
    safe_reports
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
