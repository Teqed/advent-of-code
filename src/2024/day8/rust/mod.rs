use std::collections::{HashMap, HashSet};
struct Antenna {
    frequency: char,
    x: usize,
    y: usize,
}
struct Map {
    width: usize,
    height: usize,
    antennas: HashMap<char, Vec<Antenna>>,
    antinodes: HashSet<(usize, usize)>,
}

fn parse_input(input: &str) -> Map {
    let mut antennas: HashMap<char, Vec<Antenna>> = HashMap::new();
    let lines: Vec<&str> = input.lines().collect();
    let (width, height) = (lines[0].len(), lines.len());
    for (y, line) in lines.iter().enumerate() {
        for (x, frequency) in line.chars().enumerate() {
            if frequency.is_alphanumeric() {
                antennas
                    .entry(frequency)
                    .or_default()
                    .push(Antenna { frequency, x, y });
            }
        }
    }

    Map {
        width,
        height,
        antennas,
        antinodes: HashSet::new(),
    }
}

fn find_antinodes(map: &mut Map, is_part_b: bool) {
    for frequency in map.antennas.keys() {
        if let Some(antennas) = map.antennas.get(frequency) {
            for (i, antenna1) in antennas.iter().enumerate() {
                for antenna2 in &antennas[i + 1..] {
                    if is_part_b {
                        let (dx, dy) = (
                            antenna2.x as i32 - antenna1.x as i32,
                            antenna2.y as i32 - antenna1.y as i32,
                        );
                        let directions = [(antenna1, dx, dy), (antenna2, -dx, -dy)];
                        for (antenna, dx, dy) in &directions {
                            let (mut x, mut y) = (antenna.x as i32, antenna.y as i32);
                            while (0..map.width as i32).contains(&x)
                                && (0..map.height as i32).contains(&y)
                            {
                                map.antinodes.insert((x as usize, y as usize));
                                x += dx;
                                y += dy;
                            }
                        }
                    }
                    let offsets = [
                        (
                            antenna1.x as i32 - (antenna2.x as i32 - antenna1.x as i32),
                            antenna1.y as i32 - (antenna2.y as i32 - antenna1.y as i32),
                        ),
                        (
                            antenna2.x as i32 + (antenna2.x as i32 - antenna1.x as i32),
                            antenna2.y as i32 + (antenna2.y as i32 - antenna1.y as i32),
                        ),
                    ];
                    for &(x, y) in &offsets {
                        if (0..map.width as i32).contains(&x) && (0..map.height as i32).contains(&y)
                        {
                            map.antinodes.insert((x as usize, y as usize));
                        }
                    }
                }
            }
        }
    }
}

fn print_map(map: &Map) {
    println!("Map:");
    for y in 0..map.height {
        for x in 0..map.width {
            let symbol = map
                .antennas
                .values()
                .flatten()
                .find(|a| a.x == x && a.y == y)
                .map_or_else(
                    || {
                        if map.antinodes.contains(&(x, y)) {
                            '#'
                        } else {
                            '.'
                        }
                    },
                    |antenna| antenna.frequency,
                );
            print!("{}", symbol);
        }
        println!();
    }
}

pub fn part_a(input: &str) -> i32 {
    let mut map = parse_input(input);
    print_map(&map);
    find_antinodes(&mut map, false);
    print_map(&map);
    map.antinodes.len() as i32
}

pub fn part_b(input: &str) -> i32 {
    let mut map = parse_input(input);
    print_map(&map);
    find_antinodes(&mut map, true);
    print_map(&map);
    map.antinodes.len() as i32
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 8;
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
        assert_eq!(part_a(example_input), 14);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 400);
    }
    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 34);
    }
    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 1280);
    }
}
