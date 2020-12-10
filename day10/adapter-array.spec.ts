import { getDiffs, getAnswer1, getArrangementsNumber } from "./adapter-array";

const TEST_DATA_1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

const TEST_DATA_2 = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

test("What is the number of 1-jolt differences multiplied by the number of 3-jolt differences? #1", () => {
  const diffs = getDiffs(TEST_DATA_1);
  const answer1 = getAnswer1(diffs);
  expect(answer1).toEqual(7 * 5);
});

test("What is the number of 1-jolt differences multiplied by the number of 3-jolt differences? #2", () => {
  const diffs = getDiffs(TEST_DATA_2);
  const answer1 = getAnswer1(diffs);
  expect(answer1).toEqual(22 * 10);
});

test("What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device? #1", () => {
  expect(getArrangementsNumber(TEST_DATA_1)).toEqual(8);
});

test("What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device? #2", () => {
  expect(getArrangementsNumber(TEST_DATA_2)).toEqual(19208);
});
