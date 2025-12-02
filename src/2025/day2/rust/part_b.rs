use super::common::{parse_range, is_invalid_id_part_b};

/// Sum all invalid product IDs (repeated at least twice) across all ranges.
pub fn part_b(input: &str) -> u64 {
    input
        .lines()
        .flat_map(|line| line.split(',')) // Split by commas.
        .filter(|s| !s.trim().is_empty()) // Filter empty strings.
        .map(|range| {
            let (start, end) = parse_range(range.trim());
            (start..=end).filter(|&n| is_invalid_id_part_b(n)).sum::<u64>()
        })
        .sum()
}
