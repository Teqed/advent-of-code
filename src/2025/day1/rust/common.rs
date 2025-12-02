/// The direction to rotate the dial.
pub enum Direction {
    Left,  // Move toward lower numbers.
    Right, // Move toward higher numbers.
}

/// An instruction to rotate the dial.
pub struct Instruction {
    pub direction: Direction, // L or R.
    pub distance: u16,        // How many clicks to rotate.
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
    pub position: u16, // Current position on the dial.
}
impl Dial {
    /// Create a new dial starting at position 50.
    pub const fn new() -> Self {
        Self { position: 50 }
    }

    /// Rotate the dial according to an instruction, wrapping around at 0/99 using modulo arithmetic.
    /// 
    /// The remainder of the modulo operation is effectively, "what remains after subtracting 100 as many times as possible?"
    /// This allows us to account for full rotations around the dial and determining what position we should have landed on.
    pub const fn rotate(&mut self, instruction: &Instruction) {
        self.position = match instruction.direction {
            Direction::Left => (self.position + 100 - instruction.distance % 100) % 100, // For Left, add 100 before subtracting to avoid negative values.
            Direction::Right => (self.position + instruction.distance) % 100, // For Right, simply wrap around at 100.
        };
    }

    /// Check if dial points at 0.
    pub const fn is_at_zero(&self) -> bool {
        self.position == 0
    }

    /// Count how many times the dial passes through 0 during a rotation using division.
    pub const fn count_zero_crossings(&self, instruction: &Instruction) -> u16 {
        match instruction.direction {
            Direction::Left => {
                let first_crossing = if self.position == 0 { 100 } else { self.position };
                if instruction.distance < first_crossing { 0 } // Distance too short to reach first crossing.
                else { (instruction.distance - first_crossing) / 100 + 1 } // First crossing + additional full rotations.
            }
            Direction::Right => (self.position + instruction.distance) / 100, // Count complete 100-step cycles.
        }
    }
}
