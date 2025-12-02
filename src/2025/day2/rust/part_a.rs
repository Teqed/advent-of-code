use super::common::{is_invalid_id, parse_range};

/// Sum all invalid product IDs across all ranges.
pub fn part_a(input: &str) -> u64 {
    input
        .lines()
        .flat_map(|line| line.split(',')) // Split by commas.
        .filter(|s| !s.trim().is_empty()) // Filter empty strings.
        .map(|range| {
            let (start, end) = parse_range(range.trim());
            (start..=end).filter(|&n| is_invalid_id(n)).sum::<u64>()
        })
        .sum()
}
