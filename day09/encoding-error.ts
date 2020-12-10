import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const numbers = file.split("\n").map((l) => +l);

// #1
const PREAMBLE_LENGTH = 25;

function validateNumber(preamble: number[], number: number): boolean {
  let sums = [];
  for (let i = 0; i < preamble.length - 1; i++) {
    sums.push(...preamble.slice(i + 1).map((a) => a + preamble[i]));
  }
  return sums.includes(number);
}

export function validateNumbers(
  numbers: number[],
  preambleLength: number
): number {
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    if (i >= preambleLength) {
      if (!validateNumber(numbers.slice(i - preambleLength, i), number)) {
        return number;
      }
    }
  }
  return -1;
}

const invalidNumber = validateNumbers(numbers, PREAMBLE_LENGTH);

console.log(`Answer #1: ${invalidNumber}`);

// #2
function findSet(numbers: number[], sum: number): number[] {
    for (let i = 1; i < numbers.length; i++) {
        const set = numbers.slice(0, i)
        const setSum = set.reduce((a, b) => a + b, 0)
        if (setSum > sum) {
            return []
        }
        if (setSum === sum) {
            return set
        }
    }
    return []
};

export function findContiguousSet(numbers: number[], sum: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const set = findSet(numbers.slice(i), sum);

    if (set.length) {
      return set;
    }
  }
  return []
}

const contiguousSetSorted = findContiguousSet(numbers, invalidNumber).sort((a, b) => a - b)

console.log(`Anser #2: ${contiguousSetSorted[0] + contiguousSetSorted.slice(-1)[0]}`);
