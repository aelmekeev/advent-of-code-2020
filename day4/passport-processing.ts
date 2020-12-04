import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, 'data'), "utf-8");
const lines = file.split("\n");

const REQUIRED = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export function validate(field: string, value: string): boolean {
  switch (field) {
    case "byr":
      if (+value < 1920 || +value > 2002) {
        return false;
      }
      break;
    case "iyr":
      if (+value < 2010 || +value > 2020) {
        return false;
      }
      break;
    case "eyr":
      if (+value < 2020 || +value > 2030) {
        return false;
      }
      break;
    case "hgt":
      const hgtValue = parseInt(value.substring(0, value.length));
      let isValid = true;
      switch (value.slice(-2)) {
        case "cm":
          if (hgtValue < 150 || hgtValue > 193) {
            return false;
          }
          break;
        case "in":
          if (hgtValue < 59 || hgtValue > 76) {
            return false;
          }
          break;
        default:
          return false;
      }
      break;
    case "hcl":
      if (!value.match(/^#[0-9a-f]{6}$/)) {
        return false;
      }
      break;
    case "ecl":
      if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value)) {
        return false;
      }
      break;
    case "pid":
      if (!value.match(/^[0-9]{9}$/)) {
        return false;
      }
      break;
  }
  return true;
}

// get an answer #1
let passportFields: string[] = [];
let validPassports = 0;
lines.forEach((line, i) => {
  passportFields = [
    ...passportFields,
    ...line
      .split(" ")
      .reduce((acc, cur) => acc.concat(cur.split(":")[0]), [] as string[]),
  ];
  if (!line.length || i === lines.length - 1) {
    if (REQUIRED.every((f) => passportFields.includes(f))) {
      validPassports++;
    }
    passportFields = [];
  }
});
console.log(`Answer #1: ${validPassports}`);

// get an answer #2
passportFields = [];
validPassports = 0;
let isValid = true;
lines.forEach((line, i) => {
  passportFields = [
    ...passportFields,
    ...line.split(" ").reduce((acc, cur) => {
      const field = cur.split(":")[0];
      isValid = isValid && validate(field, cur.split(":")[1]);
      return acc.concat(field);
    }, [] as string[]),
  ];
  if (!line.length || i === lines.length - 1) {
    if (isValid && REQUIRED.every((f) => passportFields.includes(f))) {
      validPassports++;
    }
    passportFields = [];
    isValid = true;
  }
});
console.log(`Answer #2: ${validPassports}`);
