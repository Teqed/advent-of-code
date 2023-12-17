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
    // Like partB, but let's handle the seeds as ranges instead of individual numbers.
    // This way, we can handle many number of consecutive seeds.
    // When a range of seeds overlaps with a map, we might need to split the range into two or more ranges.
    const seedRanges: Array<[number, number]> = [];
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
            for (let i = 0; i < seedsArray.length; i += 2) {
                const seedMin = Number.parseInt(seedsArray[i], 10);
                const seedMax = (Number.parseInt(seedsArray[i], 10) + Number.parseInt(seedsArray[i + 1], 10));
                seedRanges.push([seedMin, seedMax]);
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

    const processBetterMaps = (input: Array<[number, number]>, mapsDictionary: Record<number, BetterAlmanacMap[]>): Array<[number, number]> => {
        const output: Array<[number, number]> = [];
        const processMap = (input: Array<[number, number]>, map: BetterAlmanacMap): Array<[number, number]> => {
            const outputSeed: Array<[number, number]> = [];
            for (const seedRange of input) {
                const [seedRangeMin, seedRangeMax] = seedRange;
                console.log(`Processing seed range ${seedRangeMin}-${seedRangeMax}`);
                if (seedRangeMin >= map.sourceRangeStart && seedRangeMin <= map.sourceRangeEnd) {
                    console.log(`Adding seed range ${seedRangeMin}-${seedRangeMax} to output.`);
                    const outputMin = seedRangeMin + map.offset;
                    const outputMax = seedRangeMax + map.offset;
                    outputSeed.push([outputMin, outputMax]);
                // If the seed range only partially overlaps with the map, we need to split the seed range into two or more ranges.
                } else if ((seedRangeMin <= map.sourceRangeEnd && seedRangeMax >= map.sourceRangeStart) || (seedRangeMin >= map.sourceRangeEnd && seedRangeMax <= map.sourceRangeStart)) {
                    // Find where the seed range intersects with the map, and split the overlap into a new range.
                    console.log(`Splitting seed range ${seedRangeMin}-${seedRangeMax}`);
                    const newRange: [number, number] = [seedRangeMin, seedRangeMax];
                    const oldRange: [number, number] = [seedRangeMin, seedRangeMax];
                    if (seedRangeMin < map.sourceRangeStart) {
                        console.log(`map.sourceRangeStart: ${map.sourceRangeStart}`);
                        newRange[0] = map.sourceRangeStart;
                        oldRange[1] = map.sourceRangeStart - 1;
                        console.log(`Setting new range to ${newRange[0]}-${newRange[1]}`);
                        console.log(`Setting old range to ${oldRange[0]}-${oldRange[1]}`);
                    }

                    if (seedRangeMax > map.sourceRangeEnd) {
                        console.log(`map.sourceRangeEnd: ${map.sourceRangeEnd}`);
                        newRange[1] = map.sourceRangeEnd;
                        oldRange[0] = map.sourceRangeEnd + 1;
                        console.log(`Setting new range to ${newRange[0]}-${newRange[1]}`);
                        console.log(`Setting old range to ${oldRange[0]}-${oldRange[1]}`);
                    }

                    // Process the new range.
                    const outputMin = newRange[0] + map.offset;
                    const outputMax = newRange[1] + map.offset;
                    console.log(`Transforming seed range ${newRange[0]}-${newRange[1]} into ${outputMin}-${outputMax}`);
                    console.log(`Splitting seed range ${seedRangeMin}-${seedRangeMax} into ${newRange[0]}-${newRange[1]} and ${oldRange[0]}-${oldRange[1]}`);
                    outputSeed.push([outputMin, outputMax], [oldRange[0], oldRange[1]]);
                }
            }

            const outputSeedString = outputSeed.map(seed => seed.join('-')).join(', ');
            console.log(`Returning output seed ${outputSeedString}`);
            return outputSeed;
        };

        for (let i = 0; i < Object.keys(mapsDictionary).length; i++) {
            for (const map of mapsDictionary[i]) {
                for (const seedRange of input) {
                    console.log(`Processing seed range ${seedRange[0]}-${seedRange[1]}`);
                    output.push(...processMap([seedRange], map));
                }
            }
        }

        return output;
    };

    const output = processBetterMaps(seedRanges, mapDictionary);

    let lowestOutput;
    for (const seedRange of output) {
        const seedString = seedRange.join('-');
        console.log(`Seed range: ${seedString}`);
        if (lowestOutput === undefined || seedRange[0] < lowestOutput) {
            console.log(`Setting lowest output to ${seedRange[0]}`);
            lowestOutput = seedRange[0];
        }
    }

    return lowestOutput;
};
