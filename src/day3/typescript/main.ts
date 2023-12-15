export const partA = (input: string[]): number => { // Part A
	enum Color {
		YELLOW = '\u001B[33m',
		RED = '\u001B[31m',
		WHITE = '\u001B[37m',
		BLUE = '\u001B[34m',
		GREEN = '\u001B[32m',
		RESET = '\u001B[0m',
	}
	enum Type {
		EMPTY,
		SYMBOL,
		NUMBER,
		NUMBER_PART,
	}
	type Gridpoint = {
		x: number;
		y: number;
		value: string;
		type: Type;
	};

	const grid: Gridpoint[][] = [];
	let currentLine = 0;
	let currentChar = 0;
	for (const line of input) {
		for (const _char of line) {
			// Determine the type of the current character.
			let type = Type.SYMBOL;
			if (_char === '.') {
				type = Type.EMPTY;
			} else if (/\d/.test(_char)) {
				type = Type.NUMBER;
			} else if (_char === '\r') {
				// This is a carriage return. Skip it.
				continue;
			}

			const gridpoint: Gridpoint = {
				x: currentChar,
				y: currentLine,
				value: _char,
				type,
			};

			if (grid[currentLine] === undefined) {
				grid[currentLine] = [];
			}

			grid[currentLine].push(gridpoint);
			currentChar++;
		}

		currentLine++;
		currentChar = 0;
	}

	for (const line of grid) {
		for (const gridpoint of line) {
			if (gridpoint.type === Type.SYMBOL) {
				// Look for any numbers in a 3x3 around this symbol.
				const coords = [
					{x: gridpoint.x - 1, y: gridpoint.y - 1},
					{x: gridpoint.x - 1, y: gridpoint.y},
					{x: gridpoint.x - 1, y: gridpoint.y + 1},
					{x: gridpoint.x, y: gridpoint.y - 1},
					{x: gridpoint.x, y: gridpoint.y + 1},
					{x: gridpoint.x + 1, y: gridpoint.y - 1},
					{x: gridpoint.x + 1, y: gridpoint.y},
					{x: gridpoint.x + 1, y: gridpoint.y + 1},
				];
				for (const coord of coords) {
					try {
						const point = grid[coord.y][coord.x];
						if (point.type === Type.NUMBER) {
							point.type = Type.NUMBER_PART;
							// Look right from this number for any other numbers.
							const lookRight = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER) {
										point.type = Type.NUMBER_PART;
										return lookRight(x + 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							const lookLeft = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER) {
										point.type = Type.NUMBER_PART;
										return lookLeft(x - 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookRight(point.x + 1, point.y);
							lookLeft(point.x - 1, point.y);
						}
					} catch {
						// Do nothing.
					}
				}
			}
		}
	}

	// Let's read through our grid and record every consecutive number as an integer.
	const enginePartNumbers: number[] = [];
	for (const line of grid) {
		let possibleNumber = '';
		for (const gridpoint of line) {
			if (gridpoint.type === Type.NUMBER_PART) {
				possibleNumber += gridpoint.value;
			} else if (possibleNumber !== '') {
				enginePartNumbers.push(Number.parseInt(possibleNumber, 10));
				possibleNumber = '';
			}
		}

		if (possibleNumber !== '') {
			enginePartNumbers.push(Number.parseInt(possibleNumber, 10));
			possibleNumber = '';
		}
	}

	const printWithColor = (grid: Gridpoint[][]): void => {
		for (const line of grid) {
			for (const gridpoint of line) {
				switch (gridpoint.type) {
					case Type.EMPTY: {
						gridpoint.value = `${Color.BLUE}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.NUMBER: {
						gridpoint.value = `${Color.YELLOW}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.SYMBOL: {
						gridpoint.value = `${Color.RED}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.NUMBER_PART: {
						gridpoint.value = `${Color.GREEN}${gridpoint.value}${Color.RESET}`;

						break;
					}
				// No default
				}

				Deno.stdout.writeSync(new TextEncoder().encode(gridpoint.value)); // eslint-disable-line @typescript-eslint/no-unsafe-call
			}

			Deno.stdout.writeSync(new TextEncoder().encode('\n')); // eslint-disable-line @typescript-eslint/no-unsafe-call
		}
	};

	printWithColor(grid);

	// Add them all up.
	let sum = 0;
	for (const number of enginePartNumbers) {
		sum += number;
	}

	console.log(`Sum is ${sum}`);
	return sum; // Answer:
};

// *********************************************************************************************************************
// *********************************************************************************************************************
// *********************************************************************************************************************

// eslint-disable-next-line complexity
export const partB = (input: string[]): number => {
	enum Color {
		YELLOW = '\u001B[33m',
		RED = '\u001B[31m',
		WHITE = '\u001B[37m',
		BLUE = '\u001B[34m',
		GREEN = '\u001B[32m',
		PINK = '\u001B[95m',
		RESET = '\u001B[0m',
	}
	enum Type {
		EMPTY,
		SYMBOL,
		NUMBER,
		NUMBER_PART,
		NUMBER_STAR,
		STAR,
	}
	type Gridpoint = {
		x: number;
		y: number;
		value: string;
		type: Type;
	};

	const grid: Gridpoint[][] = [];
	let currentLine = 0;
	let currentChar = 0;
	for (const line of input) {
		for (const _char of line) {
			// Determine the type of the current character.
			let type = Type.SYMBOL;
			if (_char === '.') {
				type = Type.EMPTY;
			} else if (_char === '*') {
				type = Type.STAR;
			} else if (/\d/.test(_char)) {
				type = Type.NUMBER;
			} else if (_char === '\r') {
				// This is a carriage return. Skip it.
				continue;
			}

			const gridpoint: Gridpoint = {
				x: currentChar,
				y: currentLine,
				value: _char,
				type,
			};

			if (grid[currentLine] === undefined) {
				grid[currentLine] = [];
			}

			grid[currentLine].push(gridpoint);
			currentChar++;
		}

		currentLine++;
		currentChar = 0;
	}

	for (const line of grid) {
		for (const gridpoint of line) {
			if (gridpoint.type === Type.STAR) {
				const coords = [
					{x: gridpoint.x - 1, y: gridpoint.y - 1},
					{x: gridpoint.x - 1, y: gridpoint.y},
					{x: gridpoint.x - 1, y: gridpoint.y + 1},
					{x: gridpoint.x, y: gridpoint.y - 1},
					{x: gridpoint.x, y: gridpoint.y + 1},
					{x: gridpoint.x + 1, y: gridpoint.y - 1},
					{x: gridpoint.x + 1, y: gridpoint.y},
					{x: gridpoint.x + 1, y: gridpoint.y + 1},
				];
				for (const coord of coords) {
					try {
						const point = grid[coord.y][coord.x];
						if (point.type === Type.NUMBER) {
							point.type = Type.NUMBER_STAR;
							const lookRight = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER) {
										point.type = Type.NUMBER_STAR;
										return lookRight(x + 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							const lookLeft = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER) {
										point.type = Type.NUMBER_STAR;
										return lookLeft(x - 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookRight(point.x + 1, point.y);
							lookLeft(point.x - 1, point.y);
						}
					} catch {
						// Do nothing.
					}
				}
			} else if (gridpoint.type === Type.SYMBOL) {
				// Look for any numbers in a 3x3 around this symbol.
				const coords = [
					{x: gridpoint.x - 1, y: gridpoint.y - 1},
					{x: gridpoint.x - 1, y: gridpoint.y},
					{x: gridpoint.x - 1, y: gridpoint.y + 1},
					{x: gridpoint.x, y: gridpoint.y - 1},
					{x: gridpoint.x, y: gridpoint.y + 1},
					{x: gridpoint.x + 1, y: gridpoint.y - 1},
					{x: gridpoint.x + 1, y: gridpoint.y},
					{x: gridpoint.x + 1, y: gridpoint.y + 1},
				];
				for (const coord of coords) {
					try {
						const point = grid[coord.y][coord.x];
						if (point.type === Type.NUMBER) {
							point.type = Type.NUMBER_PART;
							const lookRight = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER) {
										point.type = Type.NUMBER_PART;
										return lookRight(x + 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							const lookLeft = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER) {
										point.type = Type.NUMBER_PART;
										return lookLeft(x - 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookRight(point.x + 1, point.y);
							lookLeft(point.x - 1, point.y);
						}
					} catch {
						// Do nothing.
					}
				}
			}
		}
	}

	const enginePartNumbers: number[] = [];
	for (const line of grid) {
		let possibleNumber = '';
		for (const gridpoint of line) {
			if (gridpoint.type === Type.NUMBER_PART) {
				possibleNumber += gridpoint.value;
			} else if (possibleNumber !== '') {
				enginePartNumbers.push(Number.parseInt(possibleNumber, 10));
				possibleNumber = '';
			}
		}

		if (possibleNumber !== '') {
			enginePartNumbers.push(Number.parseInt(possibleNumber, 10));
			possibleNumber = '';
		}
	}

	const engineStarPartNumbers: number[][] = [];
	for (const line of grid) {
		for (const gridpoint of line) {
			if (gridpoint.type === Type.STAR) {
				const possiblePair = [];

				let lookRightCounts = 0;
				if (grid[gridpoint.y - 1] !== undefined) {
					if (grid[gridpoint.y - 1][gridpoint.x - 1].type === Type.NUMBER_STAR) {
						let possibleNumber = grid[gridpoint.y - 1][gridpoint.x - 1].value;
						const lookLeft = (x: number, y: number): boolean => {
							try {
								const point = grid[y][x];
								if (point.type === Type.NUMBER_STAR) {
									possibleNumber = point.value + possibleNumber;
									return lookLeft(x - 1, y);
								}

								return false;
							} catch {
								return false;
							}
						};

						lookLeft(gridpoint.x - 2, gridpoint.y - 1);

						const lookRight = (x: number, y: number): boolean => {
							try {
								const point = grid[y][x];
								if (point.type === Type.NUMBER_STAR) {
									possibleNumber += point.value;
									lookRightCounts++;
									return lookRight(x + 1, y);
								}

								return false;
							} catch {
								return false;
							}
						};

						lookRight(gridpoint.x, gridpoint.y - 1);
						possiblePair.push(Number.parseInt(possibleNumber, 10));
					}

					let lookRightCounts2 = 0;
					if (lookRightCounts === 0 && grid[gridpoint.y - 1][gridpoint.x].type === Type.NUMBER_STAR) {
						let possibleNumber = grid[gridpoint.y - 1][gridpoint.x].value;

						const lookRight = (x: number, y: number): boolean => {
							try {
								const point = grid[y][x];
								if (point.type === Type.NUMBER_STAR) {
									possibleNumber += point.value;
									lookRightCounts2++;
									return lookRight(x + 1, y);
								}

								return false;
							} catch {
								return false;
							}
						};

						lookRight(gridpoint.x + 1, gridpoint.y - 1);
						possiblePair.push(Number.parseInt(possibleNumber, 10));
					}

					if (lookRightCounts < 2 && lookRightCounts2 === 0 && grid[gridpoint.y - 1][gridpoint.x + 1].type === Type.NUMBER_STAR) {
						let possibleNumber = grid[gridpoint.y - 1][gridpoint.x + 1].value;

						const lookRight = (x: number, y: number): boolean => {
							try {
								const point = grid[y][x];
								if (point.type === Type.NUMBER_STAR) {
									possibleNumber += point.value;
									return lookRight(x + 1, y);
								}

								return false;
							} catch {
								return false;
							}
						};

						lookRight(gridpoint.x + 2, gridpoint.y - 1);
						possiblePair.push(Number.parseInt(possibleNumber, 10));
					}

					if (grid[gridpoint.y][gridpoint.x - 1].type === Type.NUMBER_STAR) {
						let possibleNumber = grid[gridpoint.y][gridpoint.x - 1].value;

						const lookLeft = (x: number, y: number): boolean => {
							try {
								const point = grid[y][x];
								if (point.type === Type.NUMBER_STAR) {
									possibleNumber = point.value + possibleNumber;
									return lookLeft(x - 1, y);
								}

								return false;
							} catch {
								return false;
							}
						};

						lookLeft(gridpoint.x - 2, gridpoint.y);
						possiblePair.push(Number.parseInt(possibleNumber, 10));
					}

					if (grid[gridpoint.y][gridpoint.x + 1].type === Type.NUMBER_STAR) {
						let possibleNumber = grid[gridpoint.y][gridpoint.x + 1].value;

						const lookRight = (x: number, y: number): boolean => {
							try {
								const point = grid[y][x];
								if (point.type === Type.NUMBER_STAR) {
									possibleNumber += point.value;
									return lookRight(x + 1, y);
								}

								return false;
							} catch {
								return false;
							}
						};

						lookRight(gridpoint.x + 2, gridpoint.y);
						possiblePair.push(Number.parseInt(possibleNumber, 10));
					}

					lookRightCounts = 0;
					if (grid[gridpoint.y + 1] !== undefined) {
						if (grid[gridpoint.y + 1][gridpoint.x - 1].type === Type.NUMBER_STAR) {
							let possibleNumber = grid[gridpoint.y + 1][gridpoint.x - 1].value;
							const lookLeft = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER_STAR) {
										possibleNumber = point.value + possibleNumber;
										return lookLeft(x - 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookLeft(gridpoint.x - 2, gridpoint.y + 1);

							const lookRight = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER_STAR) {
										possibleNumber += point.value;
										lookRightCounts++;
										return lookRight(x + 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookRight(gridpoint.x, gridpoint.y + 1);
							possiblePair.push(Number.parseInt(possibleNumber, 10));
						}

						lookRightCounts2 = 0;
						if (lookRightCounts === 0 && grid[gridpoint.y + 1][gridpoint.x].type === Type.NUMBER_STAR) {
							let possibleNumber = grid[gridpoint.y + 1][gridpoint.x].value;

							const lookRight = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER_STAR) {
										possibleNumber += point.value;
										lookRightCounts2++;
										return lookRight(x + 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookRight(gridpoint.x + 1, gridpoint.y + 1);
							possiblePair.push(Number.parseInt(possibleNumber, 10));
						}

						if (lookRightCounts < 2 && lookRightCounts2 === 0 && grid[gridpoint.y + 1][gridpoint.x + 1].type === Type.NUMBER_STAR) {
							let possibleNumber = grid[gridpoint.y + 1][gridpoint.x + 1].value;
							const lookRight = (x: number, y: number): boolean => {
								try {
									const point = grid[y][x];
									if (point.type === Type.NUMBER_STAR) {
										possibleNumber += point.value;
										return lookRight(x + 1, y);
									}

									return false;
								} catch {
									return false;
								}
							};

							lookRight(gridpoint.x + 2, gridpoint.y + 1);
							possiblePair.push(Number.parseInt(possibleNumber, 10));
						}
					}
				}

				if (possiblePair.length > 1) {
					engineStarPartNumbers.push(possiblePair);
				} else if (possiblePair.length === 1) {
					enginePartNumbers.push(possiblePair[0]);
				}
			}
		}
	}

	let starTotal = 0;
	for (const pair of engineStarPartNumbers) {
		starTotal += pair[0] * pair[1];
	}

	const printWithColor = (grid: Gridpoint[][]): void => {
		for (const line of grid) {
			for (const gridpoint of line) {
				switch (gridpoint.type) {
					case Type.EMPTY: {
						gridpoint.value = `${Color.BLUE}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.NUMBER: {
						gridpoint.value = `${Color.YELLOW}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.SYMBOL: {
						gridpoint.value = `${Color.RED}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.NUMBER_PART: {
						gridpoint.value = `${Color.GREEN}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.NUMBER_STAR: {
						gridpoint.value = `${Color.PINK}${gridpoint.value}${Color.RESET}`;

						break;
					}

					case Type.STAR: {
						gridpoint.value = `${Color.WHITE}${gridpoint.value}${Color.RESET}`;

						break;
					}
				// No default
				}

				Deno.stdout.writeSync(new TextEncoder().encode(gridpoint.value)); // eslint-disable-line @typescript-eslint/no-unsafe-call
			}

			Deno.stdout.writeSync(new TextEncoder().encode('\n')); // eslint-disable-line @typescript-eslint/no-unsafe-call
		}
	};

	printWithColor(grid);

	console.log(`Sum of all gear ratios is ${starTotal}`);
	return starTotal; // Answer:
};
