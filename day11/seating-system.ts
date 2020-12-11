import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const lines = file.split("\n");

// #1
enum SpotType {
  FLOOR = ".",
  SEAT = "L",
  OCCUPIED_SEAT = "#",
}

function getSpot(layout: string[], i: number, j: number): SpotType {
  const spot = layout[j].split("")[i];
  switch (spot) {
    case SpotType.FLOOR:
      return SpotType.FLOOR;
    case SpotType.SEAT:
      return SpotType.SEAT;
    case SpotType.OCCUPIED_SEAT:
      return SpotType.OCCUPIED_SEAT;
    default:
      console.log(`Unknown spot type: ${spot}`);
      return SpotType.FLOOR;
  }
}

function setSpot(
  layout: string[],
  i: number,
  j: number,
  spot: SpotType
): string[] {
  layout[j] = layout[j].substring(0, i) + spot + layout[j].substring(i + 1);
  return layout;
}

export function getSurrounding(
  layout: string[],
  i: number,
  j: number
): SpotType[] {
  const iMax = layout[0].length - 1;
  const jMax = layout.length - 1;
  let surrounding: SpotType[] = [];
  [-1, 0, 1].forEach((di) => {
    [-1, 0, 1].forEach((dj) => {
      const mi = i + di;
      const mj = j + dj;
      if (
        (dj !== 0 || di !== 0) &&
        mi >= 0 &&
        mi <= iMax &&
        mj >= 0 &&
        mj <= jMax
      ) {
        surrounding.push(getSpot(layout, mi, mj));
      }
    });
  });
  return surrounding;
}

export function applyRules(
  layout: string[],
  getSurroundingFn: (layout: string[], i: number, j: number) => SpotType[],
  occupiedLimit: number
): string[] {
  let newLayout: string[] = [...layout];
  for (let i = 0; i < layout[0].length; i++) {
    for (let j = 0; j < layout.length; j++) {
      const currentSpot = getSpot(layout, i, j);
      if (currentSpot !== SpotType.FLOOR) {
        const occupiedSeats = getSurroundingFn(layout, i, j).filter(
          (a) => a === SpotType.OCCUPIED_SEAT
        ).length;
        if (occupiedSeats === 0) {
          newLayout = setSpot(newLayout, i, j, SpotType.OCCUPIED_SEAT);
        } else if (occupiedSeats > occupiedLimit) {
          newLayout = setSpot(newLayout, i, j, SpotType.SEAT);
        }
      }
    }
  }
  return newLayout;
}

export function getOccupiedSeats(
  layout: string[],
  getSurroundingFn: (layout: string[], i: number, j: number) => SpotType[],
  occupiedLimit: number
): number {
  while (true) {
    const newLayout = applyRules(layout, getSurroundingFn, occupiedLimit);
    if (newLayout.join("") === layout.join("")) {
      return layout
        .join("")
        .split("")
        .filter((a) => a === SpotType.OCCUPIED_SEAT).length;
    } else {
      layout = newLayout;
    }
  }
}

console.log(`Answer #1: ${getOccupiedSeats(lines, getSurrounding, 3)}`);

// #2

export function getDiagonalSurrounding(
  layout: string[],
  i: number,
  j: number
): SpotType[] {
  const iMax = layout[0].length - 1;
  const jMax = layout.length - 1;
  const maxDimension = Math.max(iMax, jMax) + 1;
  let surrounding: SpotType[] = [];
  [-1, 0, 1].forEach((di) => {
    [-1, 0, 1].forEach((dj) => {
      if (dj !== 0 || di !== 0) {
        for (let k = 1; k < maxDimension; k++) {
          const mi = i + k * di;
          const mj = j + k * dj;
          if (mi >= 0 && mi <= iMax && mj >= 0 && mj <= jMax) {
            const currentSpot = getSpot(layout, mi, mj);
            surrounding.push(currentSpot);
            if (currentSpot !== SpotType.FLOOR) {
              break;
            }
          } else {
            break;
          }
        }
      }
    });
  });
  return surrounding;
}

console.log(`Answer #2: ${getOccupiedSeats(lines, getDiagonalSurrounding, 4)}`);
