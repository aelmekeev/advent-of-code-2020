import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const lines = file.split("\n");

// #1
let questions: string[] = [];
let groupsCounts: number[] = [];
lines.forEach((l, i) => {
  questions.push(...l.split(""));
  if (!l.length || i === lines.length - 1) {
    groupsCounts.push([...new Set(questions)].length);
    questions = [];
  }
});
console.log(`Answer #1: ${groupsCounts.reduce((a, b) => a + b, 0)}`);

// #2
questions = [];
groupsCounts = [];
let newGroup = true;
lines.forEach((l, i) => {
  if (!questions.length && newGroup) {
    questions.push(...l.split(""));
    newGroup = false;
  } else if (l.length) {
    questions = questions.filter((q) => [...l.split("")].includes(q));
  }
  if (!l.length || i === lines.length - 1) {
    groupsCounts.push([...new Set(questions)].length);
    questions = [];
    newGroup = true;
  }
});
console.log(`Answer #2: ${groupsCounts.reduce((a, b) => a + b, 0)}`);
