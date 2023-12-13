import {readFileSync} from 'node:fs';

const input: string[] = readFileSync('src/day2/input.txt', 'utf8').split('\n');
type Pull = {
	red: number;
	green: number;
	blue: number;
};
const inputDict: Record<number, Pull[]> = {};
for (const line of input) {
	let [gameNumber, pullString] = line.split(': ');
	gameNumber = gameNumber.split(' ')[1];
	const pulls: Pull[] = [];
	const pullArray = pullString.split('; ');
	for (let i = 0; i < pullArray.length; i++) {
		pullArray[i] = pullArray[i].trim();
	}

	for (const pull of pullArray) {
		const pullDict: Pull = {
			red: 0,
			green: 0,
			blue: 0,
		};
		const pullSplit = pull.split(', ');
		for (const cube of pullSplit) {
			const [count, color] = cube.split(' ');
			switch (color) {
				case 'red': {
					pullDict.red = Number(count);

					break;
				}

				case 'green': {
					pullDict.green = Number(count);

					break;
				}

				case 'blue': {
					pullDict.blue = Number(count);

					break;
				}
            // No default
			}
		}

		pulls.push(pullDict);
	}

	inputDict[Number(gameNumber)] = pulls;
}

(() => { // Part A
	const redCubes = 12;
	const greenCubes = 13;
	const blueCubes = 14;
	const possibleGames: number[] = [];
	for (const gameNumber in inputDict) {
		if (gameNumber in inputDict) {
			const game = inputDict[Number(gameNumber)];
			let possible = true;
			for (const pull of game) {
				if (pull.red > redCubes || pull.green > greenCubes || pull.blue > blueCubes) {
					possible = false;
				}
			}

			if (possible) {
				possibleGames.push(Number(gameNumber));
			}
		}
	}

	const sum = possibleGames.reduce((a, b) => a + b, 0);
	console.log(sum);
	// Answer: 2685
})();

(() => { // Part B
	let sumOfAllPowers = 0;
	const arrayOfPowers: number[] = [];
	const arrayOfGames: Pull[][] = [];
	for (const gameNumber in inputDict) {
		if (gameNumber in inputDict) {
			let _minimumRed = 0;
			let _minimumGreen = 0;
			let _minimumBlue = 0;
			for (const pull of inputDict[Number(gameNumber)]) {
				if (pull.red > _minimumRed) {
					_minimumRed = pull.red;
				}

				if (pull.green > _minimumGreen) {
					_minimumGreen = pull.green;
				}

				if (pull.blue > _minimumBlue) {
					_minimumBlue = pull.blue;
				}
			}

			arrayOfGames.push([{
				red: _minimumRed,
				green: _minimumGreen,
				blue: _minimumBlue,
			}]);
		}
	}

	for (const game of arrayOfGames) {
		const power = game[0].red * game[0].green * game[0].blue;
		arrayOfPowers.push(power);
	}

	for (const power of arrayOfPowers) {
		sumOfAllPowers += power;
	}

	console.log(sumOfAllPowers);
	// Answer: 83707
})();
