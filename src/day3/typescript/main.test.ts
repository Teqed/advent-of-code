/* eslint-disable @typescript-eslint/no-unsafe-call */
import {readFileSync} from 'node:fs';
import {assertEquals} from 'https://deno.land/std@0.209.0/assert/mod.ts';
import {partA, partB} from './main.ts'; // eslint-disable-line n/file-extension-in-import

const day = 3;
const answerExample = 4361;
const answerA = 0;
const answerB = 0;
const input: string[] = readFileSync(`src/day${day}/input.txt`, 'utf8').split('\n');
const inputExample: string[] = readFileSync(`src/day${day}/input_example.txt`, 'utf8').split('\n');

Deno.test('Example', () => {
	assertEquals(partA(inputExample), answerExample);
});

// Deno.test('Part A', () => {
// 	assertEquals(partA(input), answerA);
// });

// Deno.test('Part B', () => {
// 	assertEquals(partB(input), answerB);
// });
