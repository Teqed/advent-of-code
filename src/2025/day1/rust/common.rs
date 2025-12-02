/// The direction to rotate the dial.
pub enum Direction {
    Left,  // Move toward lower numbers.
    Right, // Move toward higher numbers.
}

/// An instruction to rotate the dial.
pub struct Instruction {
    pub direction: Direction, // L or R.
    pub distance: i16,        // How many clicks to rotate.
}
impl Instruction {
    /// Parse an instruction from a line of input (e.g. "L68" or "R48").
    pub fn parse(line: &str) -> Self {
        let direction = match &line[0..1] {
            "L" => Direction::Left, // Parse the direction character.
            "R" => Direction::Right,
            _ => unreachable!(), // All input has a L/R direction.
        };
        let distance = line[1..].parse().expect("valid distance"); // Then parse the distance value.
        Self {
            direction,
            distance,
        }
    }
}

/// A safe dial with positions 0-99 that wraps around.
pub struct Dial {
    pub position: i16, // Current position on the dial.
}
impl Dial {
    /// Create a new dial starting at position 50.
    pub const fn new() -> Self {
        Self { position: 50 }
    }

    /// Rotate the dial according to an instruction, wrapping around at 0/100.
    pub const fn rotate(&mut self, instruction: &Instruction) {
        self.position = match instruction.direction {
            Direction::Left => (self.position - instruction.distance).rem_euclid(100), // Wrap around at 0.
            Direction::Right => (self.position + instruction.distance).rem_euclid(100), // Wrap around at 100.
        };
    }

    /// Check if dial points at 0.
    pub const fn is_at_zero(&self) -> bool {
        self.position == 0
    }

    /// Count how many times the dial passes through 0 during a rotation.
    pub const fn count_zero_crossings(&self, instruction: &Instruction) -> i16 {
        match instruction.direction {
            Direction::Left => {
                let mut first_crossing = self.position;
                if first_crossing == 0 {
                    first_crossing = 100; // If starting at 0, first crossing Left is after full rotation.
                }
                if instruction.distance < first_crossing {
                    0 // Did not reach 0 during this rotation.
                } else {
                    (instruction.distance - first_crossing) / 100 + 1 // Returns number of Left crossings.
                }
            }
            Direction::Right => (self.position + instruction.distance) / 100, // Returns number of Right crossings.
        }
    }
}
