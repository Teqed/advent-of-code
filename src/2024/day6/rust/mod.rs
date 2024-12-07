fn process_input(input: &str) -> Vec<Vec<i32>> {
    input
        .lines()
        .map(|line| {
            line.chars()
                .map(|c| match c {
                    '.' => 0,
                    '#' => 1,
                    'X' => 2,
                    '^' => 3,
                    _ => panic!("Unexpected character in input"),
                })
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<Vec<i32>>>()
}

fn wheel_direction(direction: i32) -> i32 {
    match direction {
        3 => 4,
        4 => 5,
        5 => 6,
        6 => 3,
        _ => panic!("Unexpected direction"),
    }
}

fn moving_into_boundaries(x: usize, y: usize, map_state: &mut [Vec<i32>], guard: i32) -> bool {
    if (x == 0 && guard == 6)
        || (y == 0 && guard == 3)
        || (x == map_state[0].len() - 1 && guard == 4)
        || (y == map_state.len() - 1 && guard == 5)
    {
        map_state[y][x] = 2;
        true
    } else {
        false
    }
}

fn find_guard(map_state: &mut Vec<Vec<i32>>, counts: &mut i32, move_guard: fn(&mut Vec<Vec<i32>>, usize, usize) -> i32) -> bool {
    map_state.iter().enumerate().find_map(|(y, row)| {
        row.iter().enumerate().find_map(|(x, &tile)| {
            if (3..=6).contains(&tile) {
                Some((x, y))
            } else {
                None
            }
        })
    }).map(|(x, y)| {
        *counts += move_guard(map_state, x, y);
        true
    }).unwrap_or(false)
}

pub fn part_a(input: &str) -> i32 {
    let mut map = process_input(input);

    fn move_guard(map_state: &mut Vec<Vec<i32>>, x: usize, y: usize) -> i32 {
        let guard = map_state[y][x];
        let direction_wheel = [3, 4, 5, 6];
        let direction_index = direction_wheel
            .iter()
            .position(|&x| x == guard)
            .expect("guard should face valid direction");
        let direction_wheel_vectors: Vec<(i32, i32)> = vec![(0, -1), (1, 0), (0, 1), (-1, 0)];
        
        if moving_into_boundaries(x, y, map_state, guard) {
            return 0;
        }

        let new_y: usize = (y as i32 + direction_wheel_vectors[direction_index].1)
            .try_into()
            .expect("y should be valid");
        let new_x: usize = (x as i32 + direction_wheel_vectors[direction_index].0)
            .try_into()
            .expect("x should be valid");

        match map_state[new_y][new_x] {
            0 => {
                map_state[y][x] = 2;
                map_state[new_y][new_x] = guard;
                1
            }
            1 => {
                map_state[y][x] = wheel_direction(map_state[y][x]);
                move_guard(map_state, x, y)
            }
            2 => {
                map_state[y][x] = 2;
                map_state[new_y][new_x] = guard;
                0
            }
            _ => panic!("Unexpected character in input"),
        }
    }

    let mut toggled_tile_count = map
        .iter()
        .flat_map(|row| row.iter())
        .filter(|&&tile| (3..=6).contains(&tile))
        .count() as i32;

    while find_guard(&mut map, &mut toggled_tile_count, move_guard) {};
    toggled_tile_count
}

pub fn part_b(input: &str) -> i32 {
    let mut possible_loops = 0;
    let mut map = process_input(input);

    fn check_guard_loop(
        map_state: &mut Vec<Vec<i32>>,
        x: usize,
        y: usize,
        origin_x: usize,
        origin_y: usize,
        origin_guard: i32,
        mut recursion_depth: i32,
    ) -> bool {
        if recursion_depth > 10000 {
            return true;
        }
        recursion_depth += 1;
        let guard = map_state[y][x];
        let direction_wheel = [3, 4, 5, 6];
        let direction_index = direction_wheel
            .iter()
            .position(|&x| x == guard)
            .expect("guard should face valid direction");
        let direction_wheel_vectors: Vec<(i32, i32)> = vec![(0, -1), (1, 0), (0, 1), (-1, 0)];
        if moving_into_boundaries(x, y, map_state, guard) {
            return false;
        }
        let new_y: usize = (y as i32 + direction_wheel_vectors[direction_index].1)
            .try_into()
            .expect("y should be valid");
        let new_x: usize = (x as i32 + direction_wheel_vectors[direction_index].0)
            .try_into()
            .expect("x should be valid");

        match map_state[new_y][new_x] {
            0 => {
                map_state[y][x] = 2;
                map_state[new_y][new_x] = guard;
                check_guard_loop(
                    map_state,
                    new_x,
                    new_y,
                    origin_x,
                    origin_y,
                    origin_guard,
                    recursion_depth,
                )
            }
            1 => {
                map_state[y][x] = wheel_direction(map_state[y][x]);
                check_guard_loop(
                    map_state,
                    x,
                    y,
                    origin_x,
                    origin_y,
                    origin_guard,
                    recursion_depth,
                )
            }
            2 => {
                map_state[y][x] = 2;
                map_state[new_y][new_x] = guard;
                if new_x == origin_x && new_y == origin_y && guard == origin_guard {
                    return true;
                }
                check_guard_loop(
                    map_state,
                    new_x,
                    new_y,
                    origin_x,
                    origin_y,
                    origin_guard,
                    recursion_depth,
                )
            }
            _ => panic!("Unexpected character in input"),
        }
    }

    fn move_guard(map_state: &mut Vec<Vec<i32>>, x: usize, y: usize) -> i32 {
        let guard = map_state[y][x];
        let direction_wheel = [3, 4, 5, 6];
        let direction_index = direction_wheel
            .iter()
            .position(|&x| x == guard)
            .expect("guard should face valid direction");
        let direction_wheel_vectors: Vec<(i32, i32)> = vec![(0, -1), (1, 0), (0, 1), (-1, 0)];

        if moving_into_boundaries(x, y, map_state, guard) {
            return 0;
        }

        let new_y: usize = (y as i32 + direction_wheel_vectors[direction_index].1)
            .try_into()
            .expect("y should be valid");
        let new_x: usize = (x as i32 + direction_wheel_vectors[direction_index].0)
            .try_into()
            .expect("x should be valid");

        match map_state[new_y][new_x] {
            0 => {
                let mut map_state_clone = map_state.clone();
                map_state_clone[new_y][new_x] = 1;
                map_state_clone[y][x] = wheel_direction(map_state[y][x]);
                let possible_loop = check_guard_loop(&mut map_state_clone, x, y, x, y, guard, 0);
                map_state[y][x] = 2;
                map_state[new_y][new_x] = guard;
                if possible_loop {
                    1
                } else {
                    0
                }
            }
            1 => {
                map_state[y][x] = wheel_direction(map_state[y][x]);
                move_guard(map_state, x, y)
            }
            2 => {
                map_state[y][x] = 2;
                map_state[new_y][new_x] = guard;
                0
            }
            _ => panic!("Unexpected character in input"),
        }
    }
    while find_guard(&mut map, &mut possible_loops, move_guard) {};
    possible_loops
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
    // Rust test threads have a smaller stack size than the main thread, so this test will fail with a stack overflow.
    // #[test]
    // fn test_part_b() {
    //     let input = include_str!("../input.txt");
    //     assert_eq!(part_b(input), 1575);
    // }
}
