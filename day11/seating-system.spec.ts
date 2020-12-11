import {
  getDiagonalSurrounding,
  getOccupiedSeats,
  getSurrounding,
} from "./seating-system";

const TEST_LAYOUT = [
  "L.LL.LL.LL",
  "LLLLLLL.LL",
  "L.L.L..L..",
  "LLLL.LL.LL",
  "L.LL.LL.LL",
  "L.LLLLL.LL",
  "..L.L.....",
  "LLLLLLLLLL",
  "L.LLLLLL.L",
  "L.LLLLL.LL",
];

test("How many seats end up occupied? Simple surrounding.", () => {
  expect(getOccupiedSeats(TEST_LAYOUT, getSurrounding, 3)).toEqual(37);
});

test("How many seats end up occupied? Diagonal surrounding.", () => {
  expect(getOccupiedSeats(TEST_LAYOUT, getDiagonalSurrounding, 4)).toEqual(26);
});
