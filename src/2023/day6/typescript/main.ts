/* eslint-disable @typescript-eslint/indent */

export const partA = (input: string[]) => {
    const durationOfRace: number[] = [];
    const recordOfRace: number[] = [];
    const parsedInput = input.map(line => line.split(/\s+/).filter(x => x !== ''));
    console.log(parsedInput);
    const parsedInputNoFirstElement = parsedInput.map(line => line.slice(1));
    console.log(parsedInputNoFirstElement);
    const parsedInputNoFirstElementNumbers = parsedInputNoFirstElement.map(line => line.map(x => Number.parseInt(x, 10)));
    console.log(parsedInputNoFirstElementNumbers);
    for (const element of parsedInputNoFirstElementNumbers[0]) {
        durationOfRace.push(element);
    }

    for (const element of parsedInputNoFirstElementNumbers[1]) {
        recordOfRace.push(element);
    }

    const winningOutcomeArray: number[] = [];
    for (const [i, duration] of durationOfRace.entries()) {
        const record = recordOfRace[i];
        let winningOutcomes = 0;
        for (let j = 0; j < duration; j++) {
            const speed = j;
            const distanceTravelled = speed * (duration - j);
            if (distanceTravelled > record) {
                winningOutcomes++;
            }
        }

        winningOutcomeArray.push(winningOutcomes);
        }

    const outcomesMultiplied = winningOutcomeArray.reduce((a, b) => a * b, 1);
    return outcomesMultiplied;
};

export const partB = (input: string[]) => {
    const durationOfRace: number[] = [];
    const recordOfRace: number[] = [];
    const parsedInput = input.map(line => line.split(/\s+/).filter(x => x !== ''));
    console.log(parsedInput);
    const parsedInputNoFirstElement = parsedInput.map(line => line.slice(1));
    console.log(parsedInputNoFirstElement);
    const parsedInputNoFirstElementNumbers = parsedInputNoFirstElement.map(line => line.map(x => Number.parseInt(x, 10)));
    console.log(parsedInputNoFirstElementNumbers);
    let concatDuration = '';
    for (const element of parsedInputNoFirstElementNumbers[0]) {
        concatDuration += element;
    }

    durationOfRace.push(Number.parseInt(concatDuration, 10));

    let concatRecord = '';
    for (const element of parsedInputNoFirstElementNumbers[1]) {
        concatRecord += element;
    }

    recordOfRace.push(Number.parseInt(concatRecord, 10));

    const winningOutcomeArray: number[] = [];
    for (const [i, duration] of durationOfRace.entries()) {
        const record = recordOfRace[i];
        let winningOutcomes = 0;
        for (let j = 0; j < duration; j++) {
            const speed = j;
            const distanceTravelled = speed * (duration - j);
            if (distanceTravelled > record) {
                winningOutcomes++;
            }
        }

        winningOutcomeArray.push(winningOutcomes);
        }

    const outcomesMultiplied = winningOutcomeArray.reduce((a, b) => a * b, 1);
    return outcomesMultiplied;
    // TODO: Quadratic implementation
};
