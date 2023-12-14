/* eslint-disable @typescript-eslint/no-unsafe-call */
import {readFileSync} from 'node:fs';
import {assertEquals} from 'https://deno.land/std@0.209.0/assert/mod.ts';
import {partA, partB} from './main.ts'; // eslint-disable-line n/file-extension-in-import

const input: string[] = readFileSync('src/day1/input.txt', 'utf8').split('\n');
const inputExample: string[] = readFileSync('src/day1/input_example.txt', 'utf8').split('\n');

Deno.test('Day 1 Example', () => {
	assertEquals(partA(inputExample), 142);
});

Deno.test('Day 1 Part A', () => {
	assertEquals(partA(input), 55_029);
});

Deno.test('Day 1 Part B', () => {
	assertEquals(partB(input), 55_686);
});
