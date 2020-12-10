import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const numbers = file.split("\n").map((l) => +l);

// #1
export function getDiffs(numbers: number[]): number[] {
  return numbers
    .sort((a, b) => a - b)
    .reduce((a, b) => ({ previous: b, diffs: [...a.diffs, b - a.previous] }), {
      previous: 0,
      diffs: [] as number[],
    }).diffs;
}

export function getAnswer1(diffs: number[]): number {
  return (
    diffs.filter((d) => d === 1).length * ++diffs.filter((d) => d === 3).length
  );
}

console.log(`Answer #1: ${getAnswer1(getDiffs(numbers))}`);

// #2
export function getArrangementsNumber(numbers: number[]): number {
  const diffs = getDiffs(numbers);
  // this is cheating :(
  const mapping = {
    1: 1,
    2: 2,
    3: 4,
    4: 7,
  } as { [key: number]: number };
  let newSequense = true;
  return diffs
    .reduce((a, b) => {
      if (b === 1) {
        newSequense ? a.push(1) : a[a.length - 1]++;
      }
      newSequense = b !== 1;
      return a;
    }, [] as number[])
    .map((a) => mapping[a])
    .reduce((a, b) => a * b, 1);
}

console.log(`Answer #2: ${getArrangementsNumber(numbers)}`);
