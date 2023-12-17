/* eslint-disable @typescript-eslint/indent */

type SeedRange = {
    startInclusive: number;
    endExclusive: number;
};

type AlmanacMap = {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
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

export const partA = (input: string[]) => {
	const seeds: number[] = [];
    type BetterAlmanacMap = {
        sourceRangeStart: number;
        sourceRangeEnd: number;
        offset: number;
    };

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
    const parseSeeds = (input: string[]): SeedRange[] => {
        const seedsOutput: SeedRange[] = [];
        const seedsLine = input.find(line => line.startsWith('seeds: '));
        if (!seedsLine) {
            throw new Error('No seeds line found in input.');
        }

        const seedsString = seedsLine.replace('seeds: ', '');
        const seedsArray = seedsString.split(' ');
        for (let i = 0; i < seedsArray.length; i += 2) {
            const start = Number.parseInt(seedsArray[i], 10);
            const range = Number.parseInt(seedsArray[i + 1], 10);
            const seedRange: SeedRange = {
                startInclusive: start,
                endExclusive: start + range,
            };
            seedsOutput.push(seedRange);
            console.log(`Adding seed ${seedRange.startInclusive} -> ${seedRange.endExclusive}`);
        }

        return seedsOutput;
    };

    const seeds: SeedRange[] = parseSeeds(input);

    const parseMap = (input: string[], mapKey: AlmanacMapKeys): AlmanacMap[] => {
        const _mapDictionary: AlmanacMap[] = [];
        const mapKeyName = AlmanacMapStrings[mapKey];
        const mapLine = input.find(line => line.startsWith(`${mapKeyName}`));
        if (!mapLine) {
            throw new Error(`No ${mapKeyName} map line found in input.`);
        }

        console.log(`Found map line ${mapLine}`);

        const mapLines = [];
        let mapLineIndex = (input.indexOf(mapLine) + 1);
        while (input[mapLineIndex] !== '' && input[mapLineIndex] !== undefined && input[mapLineIndex].length > 1) {
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

            _mapDictionary.push(map);
        }

        return _mapDictionary;
    };

    const mapDictionary: Record<AlmanacMapKeys, AlmanacMap[]> = {
        [AlmanacMapKeys.SEED_TO_SOIL]: [],
        [AlmanacMapKeys.SOIL_TO_FERTILIZER]: [],
        [AlmanacMapKeys.FERTILIZER_TO_WATER]: [],
        [AlmanacMapKeys.WATER_TO_LIGHT]: [],
        [AlmanacMapKeys.LIGHT_TO_TEMPERATURE]: [],
        [AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY]: [],
        [AlmanacMapKeys.HUMITIDY_TO_LOCATION]: [],
    };

    mapDictionary[AlmanacMapKeys.SEED_TO_SOIL] = parseMap(input, AlmanacMapKeys.SEED_TO_SOIL);
    mapDictionary[AlmanacMapKeys.SOIL_TO_FERTILIZER] = parseMap(input, AlmanacMapKeys.SOIL_TO_FERTILIZER);
    mapDictionary[AlmanacMapKeys.FERTILIZER_TO_WATER] = parseMap(input, AlmanacMapKeys.FERTILIZER_TO_WATER);
    mapDictionary[AlmanacMapKeys.WATER_TO_LIGHT] = parseMap(input, AlmanacMapKeys.WATER_TO_LIGHT);
    mapDictionary[AlmanacMapKeys.LIGHT_TO_TEMPERATURE] = parseMap(input, AlmanacMapKeys.LIGHT_TO_TEMPERATURE);
    mapDictionary[AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY] = parseMap(input, AlmanacMapKeys.TEMPERATURE_TO_HUMIDITY);
    mapDictionary[AlmanacMapKeys.HUMITIDY_TO_LOCATION] = parseMap(input, AlmanacMapKeys.HUMITIDY_TO_LOCATION);

    const processMap = (input: SeedRange[], map: AlmanacMap): {processedSeeds: SeedRange[]; unprocessedSeeds: SeedRange[]} => {
        const unprocessedSeeds: SeedRange[] = [];
        const processedSeeds: SeedRange[] = [];
        const offset = map.destinationRangeStart - map.sourceRangeStart;
        const sourceRangeEndExclusive = map.sourceRangeStart + map.rangeLength + 1;

        for (const seedRange of input) {
            if (seedRange.startInclusive >= map.sourceRangeStart && (seedRange.endExclusive) <= (sourceRangeEndExclusive)) {
                console.log(`Seed ${seedRange.startInclusive} - ${seedRange.endExclusive} is within range of map ${map.sourceRangeStart} - ${sourceRangeEndExclusive}`);
                const outputSeedRange: SeedRange = {
                    startInclusive: seedRange.startInclusive + offset,
                    endExclusive: seedRange.endExclusive + offset,
                };
                processedSeeds.push(outputSeedRange);
            } else if (seedRange.startInclusive < map.sourceRangeStart && seedRange.endExclusive > map.sourceRangeStart) {
                console.log(`Seed ${seedRange.startInclusive} - ${seedRange.endExclusive} starts before range of map ${map.sourceRangeStart} - ${sourceRangeEndExclusive}`);
                const unprocessedSeedRange: SeedRange = {
                    startInclusive: seedRange.startInclusive,
                    endExclusive: map.sourceRangeStart,
                };
                unprocessedSeeds.push(unprocessedSeedRange);
                const outputSeedRange: SeedRange = {
                    startInclusive: map.sourceRangeStart + offset,
                    endExclusive: seedRange.endExclusive + offset,
                };
                processedSeeds.push(outputSeedRange);
            } else if (seedRange.startInclusive < (sourceRangeEndExclusive) && seedRange.endExclusive > (sourceRangeEndExclusive)) {
                console.log(`Seed [${seedRange.startInclusive}, ${seedRange.endExclusive}) ends after range of map [${map.sourceRangeStart}, ${sourceRangeEndExclusive})`);
                const outputSeedRange: SeedRange = {
                    startInclusive: seedRange.startInclusive + offset,
                    endExclusive: seedRange.startInclusive + map.rangeLength + offset,
                };
                console.log(`Output seed [${outputSeedRange.startInclusive}, ${outputSeedRange.endExclusive})`);
                processedSeeds.push(outputSeedRange);
                const unprocessedSeedRange: SeedRange = {
                    startInclusive: seedRange.startInclusive + map.rangeLength,
                    endExclusive: seedRange.endExclusive,
                };
                console.log(`Unprocessed seed [${unprocessedSeedRange.startInclusive}, ${unprocessedSeedRange.endExclusive})`);
                unprocessedSeeds.push(unprocessedSeedRange);
            } else if (seedRange.startInclusive < map.sourceRangeStart && seedRange.endExclusive > (sourceRangeEndExclusive)) {
                console.log(`Seed ${seedRange.startInclusive} - ${seedRange.endExclusive} starts before and ends after range of map ${map.sourceRangeStart} - ${sourceRangeEndExclusive}`);
                const unprocessedSeedRange: SeedRange = {
                    startInclusive: seedRange.startInclusive,
                    endExclusive: map.sourceRangeStart,
                };
                unprocessedSeeds.push(unprocessedSeedRange);
                const outputSeedRange: SeedRange = {
                    startInclusive: map.sourceRangeStart + offset,
                    endExclusive: map.sourceRangeStart + map.rangeLength + offset,
                };
                processedSeeds.push(outputSeedRange);
                const unprocessedSeedRange2: SeedRange = {
                    startInclusive: map.sourceRangeStart + map.rangeLength,
                    endExclusive: seedRange.endExclusive,
                };
                unprocessedSeeds.push(unprocessedSeedRange2);
            } else {
                unprocessedSeeds.push(seedRange);
            }
        }

        return {processedSeeds, unprocessedSeeds};
    };

    const processMapLayer = (inputSeeds: SeedRange[], mapLayer: AlmanacMap[]): SeedRange[] => {
        let unprocessedSeeds: SeedRange[] = inputSeeds;
        let processedSeeds: SeedRange[] = [];

        for (const map of mapLayer) {
            const {processedSeeds: _processedSeeds, unprocessedSeeds: _unprocessedSeeds} = processMap(unprocessedSeeds, map);
            processedSeeds = [...processedSeeds, ..._processedSeeds];
            unprocessedSeeds = _unprocessedSeeds;
        }

        return [...processedSeeds, ...unprocessedSeeds];
    };

    const processMapLayers = (input: SeedRange[], mapLayers: Record<AlmanacMapKeys, AlmanacMap[]>): SeedRange[] => {
        let seedContents: SeedRange[] = input;

        for (const mapLayerKey of Object.keys(mapLayers)) {
            const mapLayerKeyNumber: AlmanacMapKeys = Number.parseInt(mapLayerKey, 10);
            console.log(`Processing map layer ${mapLayerKeyNumber}, known as ${AlmanacMapStrings[mapLayerKeyNumber]}`);

            const mapLayer = mapLayers[mapLayerKeyNumber];

            seedContents = processMapLayer(seedContents.flat(), mapLayer);
        }

        return seedContents;
    };

    const output = processMapLayers(seeds, mapDictionary);

    const lowestOutput = Math.min(...output.flat().map(seedRange => seedRange.startInclusive));

    console.log(`Lowest output is ${lowestOutput}`);
    return lowestOutput;
};
