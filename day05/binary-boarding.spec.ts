import { decodeSeat, Seat } from "./binary-boarding";

[
  { encodedSeat: "FBFBBFFRLR", decodedSeat: new Seat(44, 5) },
  { encodedSeat: "BFFFBBFRRR", decodedSeat: new Seat(70, 7) },
  { encodedSeat: "FFFBBBFRRR", decodedSeat: new Seat(14, 7) },
  { encodedSeat: "BBFFBBFRLL", decodedSeat: new Seat(102, 4) },
].forEach((t) => {
  test(`${t.encodedSeat} should be decoded as ${t.decodedSeat.row} : ${t.decodedSeat.column}`, () => {
    const decodedSeat = decodeSeat(t.encodedSeat);
    expect(decodedSeat.column).toBe(t.decodedSeat.column);
    expect(decodedSeat.row).toBe(t.decodedSeat.row);
  });
});
