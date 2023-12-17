/* eslint-disable @typescript-eslint/indent */
export const partA = (input: string[]) => {
	const seeds: number[] = [];
    type AlmanacMap = {
        destinationRangeStart: number;
        sourceRangeStart: number;
        rangeLength: number;
    };
    type BetterAlmanacMap = {
        sourceRangeStart: number;
        sourceRangeEnd: number;
        offset: number;
    };
    enum AlmanacMapKeys {
        SEED_TO_SOIL,
        SOIL_TO_FERTILIZER,
        FERTILIZER_TO_WATER,
        WATER_TO_LIGHT,
        LIGHT_TO_TEMPERATURE,
        TEMPERATURE_TO_HUMIDITY,
        HUMITIDY_TO_LOCATION,
    }
    enum AlmanacMapStrings {
        'seed-to-soil',
        'soil-to-fertilizer',
        'fertilizer-to-water',
        'water-to-light',
        'light-to-temperature',
        'temperature-to-humidity',
        'humidity-to-location',
    }

    const mapDictionary: Record<AlmanacMapKeys, BetterAlmanacMap[]> = {
        [AlmanacMapKeys.SEED_TO_SOIL]: [],
        [AlmanacMapKeys.SOIL_TO_FERTILIZER]: [],
        [AlmanacMapKeys.FERTILIZER_TO_WATER]: [],
        [AlmanacMapKeys.WATER_TO_LIGHT]: [],
        [AlmanacMapKeys.LIGHT_TO_TEMPERATURE]: [],
        [AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY]: [],
        [AlmanacMapKeys.HUMITIDY_TO_LOCATION]: [],
    };

    const parseInput = (input: string[]): void => {
        const parseSeeds = (input: string[]): void => {
            const seedsLine = input.find(line => line.startsWith('seeds: '));
            if (!seedsLine) {
                throw new Error('No seeds line found in input.');
            }

            const seedsString = seedsLine.replace('seeds: ', '');
            const seedsArray = seedsString.split(' ');
            for (const seed of seedsArray) {
                console.log(`Adding seed ${seed}`);
                seeds.push(Number.parseInt(seed, 10));
            }
        };

        const parseMap = (input: string[], mapKey: AlmanacMapKeys): void => {
            const mapKeyName = AlmanacMapStrings[mapKey];
            const mapLine = input.find(line => line.startsWith(`${mapKeyName}`));
            if (!mapLine) {
                throw new Error(`No ${mapKeyName} map line found in input.`);
            }

            console.log(`Found map line ${mapLine}`);

            const mapLines = [];
            let mapLineIndex = (input.indexOf(mapLine) + 1);
            while (input[mapLineIndex] !== '' && input[mapLineIndex] !== undefined && input[mapLineIndex].length > 1) {
                console.log(`Adding map line ${input[mapLineIndex]}`);
                mapLines.push(input[mapLineIndex]);
                mapLineIndex++;
            }

            for (const mapLine of mapLines) {
                const mapLineArray = mapLine.split(' ');
                const map = {
                    destinationRangeStart: Number.parseInt(mapLineArray[0], 10),
                    sourceRangeStart: Number.parseInt(mapLineArray[1], 10),
                    rangeLength: Number.parseInt(mapLineArray[2], 10),
                };
                const betterMap = {
                    sourceRangeStart: map.sourceRangeStart,
                    sourceRangeEnd: map.sourceRangeStart + map.rangeLength,
                    offset: map.destinationRangeStart - map.sourceRangeStart,
                };

                mapDictionary[mapKey].push(betterMap);
            }
        };

        parseSeeds(input);
        parseMap(input, AlmanacMapKeys.SEED_TO_SOIL);
        parseMap(input, AlmanacMapKeys.SOIL_TO_FERTILIZER);
        parseMap(input, AlmanacMapKeys.FERTILIZER_TO_WATER);
        parseMap(input, AlmanacMapKeys.WATER_TO_LIGHT);
        parseMap(input, AlmanacMapKeys.LIGHT_TO_TEMPERATURE);
        parseMap(input, AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY);
        parseMap(input, AlmanacMapKeys.HUMITIDY_TO_LOCATION);
    };

    parseInput(input);

    const processBetterMaps = (input: number[], mapsDictionary: Record<number, BetterAlmanacMap[]>): number[] => {
        const processMap = (input: number, map: BetterAlmanacMap): number | undefined => {
            if (input >= map.sourceRangeStart && input <= map.sourceRangeEnd) {
                const output = input + map.offset;
                console.log(`${input} -> ${output}`);
                return output;
            }

            return undefined;
        };

        for (let i = 0; i < Object.keys(mapsDictionary).length; i++) {
            for (let j = 0; j < input.length; j++) {
                for (const map of mapsDictionary[i]) {
                    const mapping = processMap(input[j], map);
                    if (mapping !== undefined) {
                        input[j] = mapping;
                        break;
                    }
                }
            }
        }

        return input;
    };

    const output = processBetterMaps(seeds, mapDictionary);

    const lowestOutput = Math.min(...output);

    return lowestOutput;
};

export const partB = (input: string[]) => {
	const seeds: number[] = [];
    type AlmanacMap = {
        destinationRangeStart: number;
        sourceRangeStart: number;
        rangeLength: number;
    };
    type BetterAlmanacMap = {
        sourceRangeStart: number;
        sourceRangeEnd: number;
        offset: number;
    };
    enum AlmanacMapKeys {
        SEED_TO_SOIL,
        SOIL_TO_FERTILIZER,
        FERTILIZER_TO_WATER,
        WATER_TO_LIGHT,
        LIGHT_TO_TEMPERATURE,
        TEMPERATURE_TO_HUMIDITY,
        HUMITIDY_TO_LOCATION,
    }
    enum AlmanacMapStrings {
        'seed-to-soil',
        'soil-to-fertilizer',
        'fertilizer-to-water',
        'water-to-light',
        'light-to-temperature',
        'temperature-to-humidity',
        'humidity-to-location',
    }

    const mapDictionary: Record<AlmanacMapKeys, BetterAlmanacMap[]> = {
        [AlmanacMapKeys.SEED_TO_SOIL]: [],
        [AlmanacMapKeys.SOIL_TO_FERTILIZER]: [],
        [AlmanacMapKeys.FERTILIZER_TO_WATER]: [],
        [AlmanacMapKeys.WATER_TO_LIGHT]: [],
        [AlmanacMapKeys.LIGHT_TO_TEMPERATURE]: [],
        [AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY]: [],
        [AlmanacMapKeys.HUMITIDY_TO_LOCATION]: [],
    };

    const parseInput = (input: string[]): void => {
        const parseSeeds = (input: string[]): void => {
            const seedsLine = input.find(line => line.startsWith('seeds: '));
            if (!seedsLine) {
                throw new Error('No seeds line found in input.');
            }

            const seedsString = seedsLine.replace('seeds: ', '');
            // Seeds: 79 14 55 13
            // This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.
            const seedsArray = seedsString.split(' ');
            for (let i = 0; i < seedsArray.length; i += 2) {
                const seed = Number.parseInt(seedsArray[i], 10);
                const seedRange = Number.parseInt(seedsArray[i + 1], 10) - 1;
                for (let j = 0; j < seedRange; j++) {
                    seeds.push(seed + j);
                }
            }
        };

        const parseMap = (input: string[], mapKey: AlmanacMapKeys): void => {
            const mapKeyName = AlmanacMapStrings[mapKey];
            const mapLine = input.find(line => line.startsWith(`${mapKeyName}`));
            if (!mapLine) {
                throw new Error(`No ${mapKeyName} map line found in input.`);
            }

            console.log(`Found map line ${mapLine}`);

            const mapLines = [];
            let mapLineIndex = (input.indexOf(mapLine) + 1);
            while (input[mapLineIndex] !== '' && input[mapLineIndex] !== undefined && input[mapLineIndex].length > 1) {
                console.log(`Adding map line ${input[mapLineIndex]}`);
                mapLines.push(input[mapLineIndex]);
                mapLineIndex++;
            }

            for (const mapLine of mapLines) {
                const mapLineArray = mapLine.split(' ');
                const map = {
                    destinationRangeStart: Number.parseInt(mapLineArray[0], 10),
                    sourceRangeStart: Number.parseInt(mapLineArray[1], 10),
                    rangeLength: Number.parseInt(mapLineArray[2], 10),
                };
                const betterMap = {
                    sourceRangeStart: map.sourceRangeStart,
                    sourceRangeEnd: map.sourceRangeStart + map.rangeLength,
                    offset: map.destinationRangeStart - map.sourceRangeStart,
                };

                mapDictionary[mapKey].push(betterMap);
            }
        };

        parseSeeds(input);
        parseMap(input, AlmanacMapKeys.SEED_TO_SOIL);
        parseMap(input, AlmanacMapKeys.SOIL_TO_FERTILIZER);
        parseMap(input, AlmanacMapKeys.FERTILIZER_TO_WATER);
        parseMap(input, AlmanacMapKeys.WATER_TO_LIGHT);
        parseMap(input, AlmanacMapKeys.LIGHT_TO_TEMPERATURE);
        parseMap(input, AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY);
        parseMap(input, AlmanacMapKeys.HUMITIDY_TO_LOCATION);
    };

    parseInput(input);

    const processBetterMaps = (input: number[], mapsDictionary: Record<number, BetterAlmanacMap[]>): number[] => {
        const processMap = (input: number, map: BetterAlmanacMap): number | undefined => {
            if (input >= map.sourceRangeStart && input <= map.sourceRangeEnd) {
                const output = input + map.offset;
                return output;
            }

            return undefined;
        };

        for (let i = 0; i < Object.keys(mapsDictionary).length; i++) {
            for (let j = 0; j < input.length; j++) {
                for (const map of mapsDictionary[i]) {
                    const mapping = processMap(input[j], map);
                    if (mapping !== undefined) {
                        input[j] = mapping;
                        break;
                    }
                }
            }
        }

        return input;
    };

    const output = processBetterMaps(seeds, mapDictionary);

    const lowestOutput = Math.min(...output);

    return lowestOutput;
};
