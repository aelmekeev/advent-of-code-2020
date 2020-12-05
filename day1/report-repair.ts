import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const numbers = file.split("\n").map((d) => +d);

// get an answer v1
numbers.forEach((a, i) => {
  for (let j = i; j < numbers.length; j++) {
    const b = numbers[j];

    if (a + b === 2020) {
      console.log(`${a} (${i}) + ${b} (${j}) = ${a + b}`);
      console.log(`${a} (${i}) * ${b} (${j}) = ${a * b}`);
    }
  }
});

// get an answer v2
numbers.forEach((a, i) => {
  for (let j = i; j < numbers.length; j++) {
    const b = numbers[j];

    for (let k = j; k < numbers.length; k++) {
      const c = numbers[k];

      if (a + b + c === 2020) {
        console.log(`${a} (${i}) + ${b} (${j}) + ${c} (${k}) = ${a + b * c}`);
        console.log(`${a} (${i}) * ${b} (${j}) * ${c} (${k}) = ${a * b * c}`);
      }
    }
  }
});

// generic solution
const numbersToFind = 3;
let foundResults: number[] = [];
const foo = (currentIteration = 1, leftBorder = 0) => {
  for (let i = leftBorder; i < numbers.length; i++) {
    foundResults.push(numbers[i]);

    if (currentIteration < numbersToFind) {
      foo(currentIteration + 1, i + 1);
    } else {
      if (foundResults.reduce((a, b) => a + b, 0) === 2020) {
        console.log(
          `${foundResults.join(" * ")} = ${foundResults.reduce(
            (a, b) => a * b,
            1
          )}`
        );
      }
    }

    foundResults.pop();
  }
};

foo();
