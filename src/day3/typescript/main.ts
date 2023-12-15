export const partA = (input: string[]): number => { // Part A
	// Create a virtual grid, x:140 and y will expand as needed.
	// We'll read each line of input for numbers and symbols, mapping their coordinates to the grid.
	const grid: string[][] = [];
	for (const line of input) {
		const row = line.split('');
		grid.push(row);
	}

	for (const y of grid) {
		const coloredStringArray: string[] = [];
		for (const x of y) {
			if (Number(x) || x === '0') {
				// Check behind and above you for any numbers.
				const behind = y[y.indexOf(x) - 1];
				if (Number(behind) || behind === '0') {
					// Color yourself yellow.
					coloredStringArray.push('\u001B[33m' + x + '\u001B[0m');
				} else {
					// Color yourself red.
					coloredStringArray.push('\u001B[31m' + x + '\u001B[0m');
				}
			} else if (x === '.') {
				coloredStringArray.push('\u001B[37m' + x + '\u001B[0m');
			} else {
				coloredStringArray.push(x);
			}
		}

		const coloredString = coloredStringArray.join('');
		console.log(coloredString);
	}

	return 0; // Answer:
};

export const partB = (input: string[]): number => {
	return 0; // Answer:
};
