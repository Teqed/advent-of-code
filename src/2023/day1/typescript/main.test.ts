/* eslint-disable @typescript-eslint/no-unsafe-call */
import {readFileSync} from 'node:fs';
import {assertEquals} from 'https://deno.land/std@0.209.0/assert/mod.ts';
import {partA, partB} from './main.ts'; // eslint-disable-line n/file-extension-in-import

const day = 1;
const answerExample = 142;
const answerA = 55_029;
const answerExampleB = 281;
const answerB = 55_686;
const input: string[] = readFileSync(`src/day${day}/input.txt`, 'utf8').split('\n');
const inputExample: string[] = readFileSync(`src/day${day}/input_example.txt`, 'utf8').split('\n');
const inputExampleB: string[] = readFileSync(`src/day${day}/input_example_b.txt`, 'utf8').split('\n');

Deno.test('Example', () => {
	assertEquals(partA(inputExample), answerExample);
});

Deno.test('Part A', () => {
	assertEquals(partA(input), answerA);
});

Deno.test('Example B', () => {
	assertEquals(partB(inputExampleB), answerExampleB);
});

Deno.test('Part B', () => {
	assertEquals(partB(input), answerB);
});
