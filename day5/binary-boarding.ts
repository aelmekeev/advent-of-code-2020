import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const lines = file.split("\n");

export class Seat {
  constructor(public row: number, public column: number) {}

  get id(): number {
    return this.row * 8 + this.column;
  }
}

export function decodeSeat(encodedSeat: string): Seat {
  const row = decodeBinary(
    encodedSeat.substring(0, 7).replace(/F/g, "0").replace(/B/g, "1")
  );
  const column = decodeBinary(
    encodedSeat.slice(-3).replace(/L/g, "0").replace(/R/g, "1")
  );
  return new Seat(row, column);
}

export function decodeBinary(encodedString: string): number {
  return encodedString
    .split("")
    .reduce((a, b, i) => a + Math.pow(2, encodedString.length - 1 - i) * +b, 0);
}

// get an answer #1
console.log("Answer #1: " + Math.max(...lines.map((s) => decodeSeat(s).id)));

// get an answer #2
const allIds = lines.map((s) => decodeSeat(s).id).sort((a, b) => a - b);
for (let i = 0; i < allIds.length - 1; i++) {
  if (allIds[i] + 1 !== allIds[i + 1]) {
    console.log(`Answer #2: ${allIds[i] + 1}`);
    break;
  }
}
