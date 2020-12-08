import {
  executeCommand,
  executeCommandWithMutations,
} from "./handheld-halting";

const instructions = [
  "nop +0",
  "acc +1",
  "jmp +4",
  "acc +3",
  "jmp -3",
  "acc -99",
  "acc +1",
  "jmp -4",
  "acc +6",
];

test("Find acc before second execution of the same command", () => {
  expect(executeCommand(instructions)).toEqual(5);
});

test("Find acc for fixed instructions", () => {
  expect(executeCommandWithMutations(instructions)).toEqual(8);
});
