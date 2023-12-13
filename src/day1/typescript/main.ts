// In our parent folder, we have a text file, input.txt, with lines of strings we want to store in an array.
import {readFileSync} from 'node:fs';

// Read the file and split it into an array of strings
const input: string[] = readFileSync('src/day1/input.txt', 'utf8').split('\n');

(() => { // Part A
	const calibrationValue = (line: string) => {
	// Slice the first and last digits from the string and combine them into a number
	// The first digit might be anywhere in the string, so we need to find it
		const firstDigit = (/\d/.exec(line))?.[0];
		// Reverse the string and find the first digit again
		const lastDigit = (/\d/.exec([...line].reverse().join('')))?.[0];
		// Combine the two digits into a number
		return Number((Number(firstDigit) * 10) + Number(lastDigit));
	};

	let sum = 0;
	for (const line of input) {
		sum += calibrationValue(line);
	}

	console.log(sum);
	// Answer: 55029
})();

(() => { // Part B
	const calibrationValue = (line: string): number => {
		// Let's find all possible numbers in the string.
		// For each character, if it's a digit, we'll add it to our ordered list of digits.
		// If it's a letter, we'll check if the next few characters spell out a number.
		// If they do, we'll add that number to our list of digits.
		const digits: number[] = [];
		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			if (/\d/.test(char)) {
				digits.push(Number(char));
			} else {
				switch (char) {
					case 'o': {
						if (line.slice(i, i + 3) === 'one') {
							digits.push(1);
						}

						break;
					}

					case 't': {
						if (line.slice(i, i + 3) === 'two') {
							digits.push(2);
						} else if (line.slice(i, i + 5) === 'three') {
							digits.push(3);
						}

						break;
					}

					case 'f': {
						if (line.slice(i, i + 4) === 'four') {
							digits.push(4);
						} else if (line.slice(i, i + 4) === 'five') {
							digits.push(5);
						}

						break;
					}

					case 's': {
						if (line.slice(i, i + 3) === 'six') {
							digits.push(6);
						} else if (line.slice(i, i + 5) === 'seven') {
							digits.push(7);
						}

						break;
					}

					case 'e': {
						if (line.slice(i, i + 5) === 'eight') {
							digits.push(8);
						}

						break;
					}

					case 'n': {
						if (line.slice(i, i + 4) === 'nine') {
							digits.push(9);
						}

						break;
					}

					default: {
						break;
					}
				}
			}
		}

		const firstDigit = digits[0];
		const lastDigit = digits.at(-1) ?? firstDigit;
		return (firstDigit * 10) + lastDigit;
	};

	let sum = 0;
	for (const line of input) {
		const getValue = calibrationValue(line);
		sum += getValue;
	}

	console.log(sum);
	// Answer: 55686
})();
