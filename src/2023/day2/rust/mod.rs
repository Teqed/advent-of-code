pub fn part_a(input: &str) -> i32 {
    struct Game {
        id: i32,
        rounds: Vec<Round>,
    }

    struct Round {
        red: i32,
        green: i32,
        blue: i32,
    }

    let red_cube_max = 12;
    let green_cube_max = 13;
    let blue_cube_max = 14;
    let mut sum = 0;
    let mut game_history = Vec::new();

    for line in input.lines() {
        let parts: Vec<&str> = line.split(':').collect();
        let game_id: i32 = parts[0].split_whitespace().nth(1).unwrap().parse().unwrap();
        game_history.push(Game { id: game_id, rounds: Vec::new() });
        let rounds: Vec<&str> = parts[1].split(';').collect();
        for round in rounds {
            let mut red = 0;
            let mut green = 0;
            let mut blue = 0;
            for cube in round.split(',') {
                let cube_parts: Vec<&str> = cube.split_whitespace().collect();
                let cube_color = cube_parts[1];
                let cube_count: i32 = cube_parts[0].parse().unwrap();
                match cube_color {
                    "red" => red += cube_count,
                    "green" => green += cube_count,
                    "blue" => blue += cube_count,
                    _ => panic!("Unknown cube color: {}", cube_color),
                }
            }
            game_history.last_mut().unwrap().rounds.push(Round { red, green, blue });
        }
    }

    let mut possible_game_ids = Vec::new();
    for game in &game_history {
        if game.rounds.iter().all(|round| round.red <= red_cube_max && round.green <= green_cube_max && round.blue <= blue_cube_max) {
            possible_game_ids.push(game.id);
        }
    }

    for game in &game_history {
        if possible_game_ids.contains(&game.id) {
            sum += game.id;
        }
    }

    sum
}

pub fn part_b(input: &str) -> i32 {
    struct Game {
        min_red: i32,
        min_green: i32,
        min_blue: i32,
    }

    let mut game_history = Vec::new();

    for line in input.lines() {
        let parts: Vec<&str> = line.split(':').collect();
        let rounds: Vec<&str> = parts[1].split(';').collect();
        let mut min_red = 0;
        let mut min_green = 0;
        let mut min_blue = 0;
        for round in rounds {
            let mut red = 0;
            let mut green = 0;
            let mut blue = 0;
            for cube in round.split(',') {
                let cube_parts: Vec<&str> = cube.split_whitespace().collect();
                let cube_color = cube_parts[1];
                let cube_count: i32 = cube_parts[0].parse().unwrap();
                match cube_color {
                    "red" => red += cube_count,
                    "green" => green += cube_count,
                    "blue" => blue += cube_count,
                    _ => panic!("Unknown cube color: {}", cube_color),
                }
            }
            if red > min_red {
                min_red = red;
            }
            if green > min_green {
                min_green = green;
            }
            if blue > min_blue {
                min_blue = blue;
            }
        }
        game_history.push(Game { min_red: min_red.abs(), min_green: min_green.abs(), min_blue: min_blue.abs() });
    }

    let mut sum = 0;
    for game in &game_history {
        sum += game.min_red * game.min_green * game.min_blue;
    }

    sum
}

pub fn main() {
    let input = include_str!("../input.txt");
    let example_input = include_str!("../input_example.txt");
    // let example_input_b = include_str!("../input_example_b.txt");
    let day: u8 = 2;
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
        let example_answer_a = 8;
        assert_eq!(part_a(example_input), example_answer_a);
    }
    #[test]
    fn test_part_a() {
        let input = include_str!("../input.txt");
        let answer_a = 2685;
        assert_eq!(part_a(input), answer_a);
    }
    #[test]
    fn test_part_b_example() {
        let example_input = include_str!("../input_example.txt");
        let example_answer_b = 2286;
        assert_eq!(part_b(example_input), example_answer_b);
    }

    #[test]
    fn test_part_b() {
        let input = include_str!("../input.txt");
        let answer_b = 83_707;
        assert_eq!(part_b(input), answer_b);
    }
}
