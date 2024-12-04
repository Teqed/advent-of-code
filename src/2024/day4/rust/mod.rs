pub fn part_a(input: &str) -> i32 {
    let grid: Vec<Vec<char>> = input.lines().map(|line| line.chars().collect()).collect();
    let target_word = "XMAS";
    grid.iter().enumerate().fold(0, |acc, (y, row)| {
        acc + row.iter().enumerate().fold(0, |inner_acc, (x, _)| {
            inner_acc
                + [
                    (1, 0),
                    (-1, 0),
                    (0, 1),
                    (0, -1),
                    (1, 1),
                    (-1, -1),
                    (-1, 1),
                    (1, -1),
                ]
                .iter()
                .filter(|&&(dx, dy)| {
                    (0..target_word.len()).all(|i| {
                        let nx = (x as isize + i as isize * dx) as usize;
                        let ny = (y as isize + i as isize * dy) as usize;
                        ny < grid.len()
                            && nx < grid[ny].len()
                            && grid[ny][nx]
                                == target_word
                                    .chars()
                                    .nth(i)
                                    .expect("index should not be out of bounds")
                    })
                })
                .count()
        })
    }) as i32
}

pub fn part_b(input: &str) -> i32 {
    let grid: Vec<Vec<char>> = input.lines().map(|line| line.chars().collect()).collect();
    (1..grid.len() - 1).fold(0, |count, y| {
        (1..grid[y].len() - 1).fold(count, |inner_count, x| {
            if grid[y][x] == 'A' {
                match (grid[y - 1][x - 1], grid[y + 1][x + 1]) {
                    ('M', 'S') | ('S', 'M') => match (grid[y - 1][x + 1], grid[y + 1][x - 1]) {
                        ('M', 'S') | ('S', 'M') => inner_count + 1,
                        _ => inner_count,
                    },
                    _ => inner_count,
                }
            } else {
                inner_count
            }
        })
    })
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 4;
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
        assert_eq!(part_a(example_input), 18);
    }

    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 2378);
    }

    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 9);
    }

    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 1796);
    }
}
