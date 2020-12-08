import { BagRate, countsBags, parseRule } from "./handy-haversacks";

[
  {
    rule: "light red bags contain 1 bright white bag, 2 muted yellow bags.",
    result: [
      "light red",
      [
        { color: "bright white", number: 1 },
        { color: "muted yellow", number: 2 },
      ],
    ],
  },
  {
    rule: "faded blue bags contain no other bags.",
    result: ["faded blue", []],
  },
  {
    rule: "bright white bags contain 1 shiny gold bag.",
    result: ["bright white", [{ color: "shiny gold", number: 1 }]],
  },
].forEach((t) => {
  test(t.rule, () => {
    const result = parseRule(t.rule);
    expect(result[0]).toEqual(t.result[0]);
    expect(result[1].map((m) => m.color).join("")).toEqual(
      (t.result[1] as BagRate[]).map((m) => m.color).join("")
    );
  });
});

const rules = {
  "shiny gold": [
    { color: "dark olive", number: 1 },
    { color: "vibrant plum", number: 2 },
  ],
  "faded blue": [],
  "dotted black": [],
  "vibrant plum": [
    { color: "faded blue", number: 5 },
    { color: "dotted black", number: 6 },
  ],
  "dark olive": [
    { color: "faded blue", number: 3 },
    { color: "dotted black", number: 4 },
  ],
};
[
  { target: "vibrant plum", count: 11 },
  { target: "shiny gold", count: 32 },
].forEach((t) => {
  test(t.target, () => {
    const result = countsBags(rules, t.target, 1);
    expect(result).toEqual(t.count);
  });
});
