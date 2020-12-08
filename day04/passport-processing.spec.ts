import { validate } from "./passport-processing";

[
  { field: "byr", value: 2002, isValid: true },
  { field: "byr", value: 2003, isValid: false },
  { field: "hgt", value: "60in", isValid: true },
  { field: "hgt", value: "190cm", isValid: true },
  { field: "hgt", value: "190in", isValid: false },
  { field: "hgt", value: "190", isValid: false },
  { field: "hcl", value: "#123abc", isValid: true },
  { field: "hcl", value: "#123abz", isValid: false },
  { field: "hcl", value: "123abc", isValid: false },
  { field: "ecl", value: "brn", isValid: true },
  { field: "ecl", value: "wat", isValid: false },
  { field: "pid", value: "000000001", isValid: true },
  { field: "pid", value: "0123456789", isValid: false },
].forEach((t) => {
  test(`${t.field} ${t.value} should be ${t.isValid}`, () => {
    expect(validate(t.field, "" + t.value)).toBe(t.isValid);
  });
});
