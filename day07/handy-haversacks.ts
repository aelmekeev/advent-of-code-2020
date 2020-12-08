import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const lines = file.split("\n");

export interface BagRate {
  color: string;
  number: number;
}

export function parseRule(rule: string): [color: string, links: BagRate[]] {
  const matched1 = rule.match(/(.+) bag[s]* contain (.+)/)!;
  const color = matched1[1];
  let links: BagRate[] = [];
  if (!rule.includes("no other bags")) {
    links = matched1[2].split(", ").map((m) => {
      const matched3 = m.match(/(\d+) (.+) bag[s]*[\.]*/)!;
      return { color: matched3[2], number: +matched3[1] };
    });
  }
  return [color, links];
}

const TARGET_COLOR = "shiny gold";

// #1
let bags: {
  [key: string]: string[];
} = {};
for (let line of lines) {
  const [color, links] = parseRule(line);
  links.forEach((l) => {
    if (!bags[l.color]) {
      bags[l.color] = [];
    }
    bags[l.color].push(color);
  });
}

let colorsToCheck: string[] = [];
let uniqueColors = new Set();
function checkColor(colorToCheck: string) {
  uniqueColors.add(colorToCheck);
  if (bags[colorToCheck]) {
    colorsToCheck.push(...bags[colorToCheck]);
  }
  if (colorsToCheck.length) {
    checkColor(colorsToCheck.pop()!);
  }
}
checkColor(TARGET_COLOR);
console.log(`Answer #1: ${uniqueColors.size - 1}`);

// #2
let bagRules: {
  [key: string]: BagRate[];
} = {};
for (let line of lines) {
  const [color, links] = parseRule(line);
  bagRules[color] = links;
}

export function countsBags(
  rules: {
    [key: string]: BagRate[];
  },
  color: string,
  multiplier: number
): number {
  const bagsNumber =
    rules[color].map((l) => l.number).reduce((a, b) => a + b, 0) * multiplier;
  const nestedBagsNumber = rules[color]
    .map((l) => countsBags(rules, l.color, l.number * multiplier))
    .reduce((a, b) => a + b, 0);
  return bagsNumber + nestedBagsNumber;
}
console.log(`Answer #2: ${countsBags(bagRules, TARGET_COLOR, 1)}`);
