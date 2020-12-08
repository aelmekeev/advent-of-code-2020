import { readFileSync } from "fs";
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, "data"), "utf-8");
const lines = file.split("\n");

type Operation = "acc" | "jmp" | "nop";

interface Instruction {
  operation: Operation;
  argument: number;
}

function parseInstruction(instructionString: string): Instruction {
  const parsedInstruction = instructionString.match(/(\w+) ([+-]\d+)/)!;
  return {
    operation: parsedInstruction[1] as Operation,
    argument: +parsedInstruction[2],
  };
}

// #1
export function executeCommand(
  instructions: string[],
  executedInstructions: number[] = [],
  instructionIndex = 0,
  acc = 0
): number {
  if (executedInstructions.includes(instructionIndex)) {
    return acc;
  } else {
    executedInstructions.push(instructionIndex);
  }

  const instruction = parseInstruction(instructions[instructionIndex]);
  let nextInstruction = instructionIndex + 1;
  switch (instruction.operation) {
    case "acc":
      acc += instruction.argument;
      break;
    case "jmp":
      nextInstruction = instructionIndex + instruction.argument;
      break;
  }
  return executeCommand(
    instructions,
    executedInstructions,
    nextInstruction,
    acc
  );
}

console.log(`Answer #1: ${executeCommand(lines)}`);

// #2

export function executeCommandWithMutations(
  instructions: string[],
  executedInstructions: number[] = [],
  mutatedInstructions: number[] = [],
  isMutated = false,
  instructionIndex = 0,
  acc = 0
): number {
  if (executedInstructions.includes(instructionIndex)) {
    return executeCommandWithMutations(instructions, [], mutatedInstructions);
  } else {
    executedInstructions.push(instructionIndex);
  }

  let { operation, argument } = parseInstruction(
    instructions[instructionIndex]
  );
  if (
    !isMutated &&
    !mutatedInstructions.includes(instructionIndex) &&
    ["jmp", "nop"].includes(operation)
  ) {
    mutatedInstructions.push(instructionIndex);
    isMutated = true;
    operation = operation === "jmp" ? "nop" : "jmp";
  }

  let nextInstruction = instructionIndex + 1;
  switch (operation) {
    case "acc":
      acc += argument;
      break;
    case "jmp":
      nextInstruction = instructionIndex + argument;
      break;
  }

  if (instructionIndex === instructions.length - 1) {
    return acc;
  } else {
    return executeCommandWithMutations(
      instructions,
      executedInstructions,
      mutatedInstructions,
      isMutated,
      nextInstruction,
      acc
    );
  }
}

// to run the current implementation you will probably need to increase stack size
// node --stack-size=3500 ./day08/handheld-halting.js
console.log(`Answer #2: ${executeCommandWithMutations(lines)}`);
