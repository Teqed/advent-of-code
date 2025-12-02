use super::common::{Dial, Instruction};

/// Count how many times the dial is left pointing at 0 after each rotation.
pub fn part_a(input: &str) -> u16 {
    let mut dial = Dial::new(); // Dial starts at position 50.
    let mut count = 0; // Count times dial is left pointing at 0.
    for line in input.lines().filter(|l| !l.is_empty()) {
        let instruction = Instruction::parse(line);
        dial.rotate(&instruction); // Rotate the dial, first.
        count += u16::from(dial.is_at_zero()); // Then increment count if at 0.
    }
    count // Return the count of times the dial pointed at 0.
}
