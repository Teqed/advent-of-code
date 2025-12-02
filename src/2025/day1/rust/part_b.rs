use super::common::{Dial, Instruction};

/// Count how many times the dial passes through 0 during any rotation.
pub fn part_b(input: &str) -> i16 {
    let mut dial = Dial::new();
    let mut count = 0;
    for line in input.lines().filter(|l| !l.is_empty()) {
        let instruction = Instruction::parse(line);
        count += dial.count_zero_crossings(&instruction); // Count zeros crossed during this rotation, first.
        dial.rotate(&instruction); // Then rotate the dial.
    }
    count // Return the count of times the dial passed through 0.
}
