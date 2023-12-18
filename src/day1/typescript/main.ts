export const partA = (input: string[]) => { // Part A
	let sum = 0;
	for (const line of input) {
		const digits = line.match(/\d/g);
		const firstDigit = digits?.[0];
		const lastDigit = digits?.[digits.length - 1];
		sum += Number((Number(firstDigit) * 10) + Number(lastDigit));
	}

	return sum;
};

export const partB = (input: string[]) => { // Part B
	let sum = 0;
	const getDigitsFrom = (line: string) => {
		const digitStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
		const digitArray: number[] = [];
		let currentIndexOfCharacter = 0;
		for (const character of line) {
			if (/\d/.test(character)) {
				digitArray.push(Number(character));
			} else if (['o', 't', 'f', 's', 'e', 'n'].includes(character)) {
				const foresight = line.slice(currentIndexOfCharacter, currentIndexOfCharacter + 5);
				for (const digitString of digitStrings) {
					if (foresight.startsWith(digitString)) {
						digitArray.push(digitStrings.indexOf(digitString) + 1);
						break;
					}
				}
			}

			currentIndexOfCharacter++;
		}

		return digitArray;
	};

	for (const line of input) {
		const digitArray = getDigitsFrom(line);
		const firstDigit = digitArray[0];
		const lastDigit = digitArray.at(-1) ?? firstDigit;
		sum += (firstDigit * 10) + lastDigit;
	}

	return sum;
};
