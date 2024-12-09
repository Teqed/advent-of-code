#[derive(PartialEq, Clone, Copy, Debug)]
enum Direction {
    North,  // '^'
    East,   // '>'
    South,  // 'v'
    West,   // '<'
}
impl Direction {
    const fn wheel(&self) -> Self {
        match self {
            Self::North => Self::East,
            Self::East => Self::South,
            Self::South => Self::West,
            Self::West => Self::North,
        }
    }
}
#[derive(Clone, Copy)]
struct Guard {
    x: usize,
    y: usize,
    direction: Direction,
    exhausted: bool,
}
#[derive(Clone, Copy)]
struct Tile {
    has_wall: bool,
    visited: bool,
}
#[derive(Clone)]
struct Map {
    guard: Guard,
    tiles: Vec<Vec<Tile>>,
    check_for_possible_loops: bool,
    possible_loops: i32,
}
impl Map {
    fn new(input: &str, is_part_b: bool) -> Self {
        let tiles = input
            .lines()
            .map(|line| {
                line.chars()
                    .map(|c| match c {
                        '^' => Tile {
                            has_wall: false,
                            visited: true,
                        },
                        '#' => Tile {
                            has_wall: true,
                            visited: false,
                        },
                        '.' => Tile {
                            has_wall: false,
                            visited: false,
                        },
                        _ => panic!("Unexpected character in input"),
                    })
                    .collect::<Vec<Tile>>()
            })
            .collect::<Vec<Vec<Tile>>>();
        let guard = tiles.iter().enumerate()
            .find_map(|(y, row)| {
                row.iter().enumerate().find(|(_, tile)| tile.visited)
                    .map(|(x, _)| Guard {
                        x,
                        y,
                        direction: Direction::North,
                        exhausted: false,
                    })
            })
            .expect("should have found a guard");
        Self {
            tiles,
            guard,
            check_for_possible_loops: is_part_b,
            possible_loops: 0,
        }
    }
    fn move_guard(&mut self) {
        if (self.guard.y == 0 && self.guard.direction == Direction::North) ||
            (self.guard.x == 0 && self.guard.direction == Direction::West) ||
            (self.guard.x == self.tiles[0].len() - 1 && self.guard.direction == Direction::East) ||
            (self.guard.y == self.tiles.len() - 1 && self.guard.direction == Direction::South)
        {
            self.guard.exhausted = true;
        } else {
            let (new_x, new_y) = match self.guard.direction {
                Direction::North => (self.guard.x, self.guard.y - 1),
                Direction::East => (self.guard.x + 1, self.guard.y),
                Direction::South => (self.guard.x, self.guard.y + 1),
                Direction::West => (self.guard.x - 1, self.guard.y),
            };
            match self.tiles[new_y][new_x].has_wall {
                false => {
                    if self.check_for_possible_loops && !self.tiles[new_y][new_x].visited {
                        self.possible_loops += self.check_guard_loop(new_x, new_y) as i32;
                    }
                    self.guard.x = new_x;
                    self.guard.y = new_y;
                    self.tiles[new_y][new_x].visited = true;
                }
                true => {
                    self.guard.direction = self.guard.direction.wheel();
                }
            }
        }
    }
    fn visited_tile_count(&self) -> i32 {
        self.tiles.iter().flatten().filter(|tile| tile.visited).count() as i32
    }
    fn exhaust_guard(&mut self) -> &Self {
        while !self.guard.exhausted {
            self.move_guard();
        }
        self
    }
    fn check_guard_loop(&self, testing_x: usize, testing_y: usize) -> bool {
        let mut loop_map = self.clone();
        loop_map.check_for_possible_loops = false;
        loop_map.tiles[testing_y][testing_x].has_wall = true;
        let mut visited_positions = Vec::new();
        let mut possible_loop_flag = false;
        while !loop_map.guard.exhausted && !possible_loop_flag {
            if visited_positions.contains(&(loop_map.guard.direction, loop_map.guard.x, loop_map.guard.y)) {
                possible_loop_flag = true;
            } else {
                visited_positions.push((loop_map.guard.direction, loop_map.guard.x, loop_map.guard.y));
                loop_map.move_guard();
            }
        }
        possible_loop_flag
    }
}

pub fn part_a(input: &str) -> i32 {
    Map::new(input, false).exhaust_guard().visited_tile_count()
}

pub fn part_b(input: &str) -> i32 {
    Map::new(input, true).exhaust_guard().possible_loops
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 6;
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
        assert_eq!(part_a(example_input), 41);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        assert_eq!(part_a(input), 4656);
    }
    #[test]
    fn test_part_b_example() {
        let example_input_b = include_str!("../input_example.txt");
        assert_eq!(part_b(example_input_b), 6);
    }
    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        assert_eq!(part_b(input), 1575);
    }
}
