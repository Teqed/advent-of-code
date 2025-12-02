/// Parse a range string like "11-22" into (start, end).
pub fn parse_range(range: &str) -> (u64, u64) {
    let parts: Vec<&str> = range.split('-').collect();
    (parts[0].parse().expect("valid start"), parts[1].parse().expect("valid end"))
}

/// Check if a product ID is invalid (digits repeated exactly twice).
pub fn is_invalid_id(num: u64) -> bool {
    let s = num.to_string(); let len = s.len();
    if len % 2 != 0 { return false; } // Must have even number of digits to split in half.
    let (first_half, second_half) = s.split_at(len / 2); // Split in half and compare.
    first_half == second_half // If both halves are equal, it's invalid, return true.
}

/// Check if a product ID is invalid (digits repeated at least twice) for Part B.
pub fn is_invalid_id_part_b(num: u64) -> bool {
    let s = num.to_string(); let len = s.len();
    for pattern_len in 1..=len / 2 { // Try each possible pattern length from 1 to len/2.
        if len % pattern_len == 0 { // Pattern length must divide evenly.
            let pattern = &s[0..pattern_len];
            let repetitions = len / pattern_len;
            if repetitions >= 2 { // Must repeat at least twice.
                if pattern.repeat(repetitions) == s { return true; }
            }
        }
    }
    false
}