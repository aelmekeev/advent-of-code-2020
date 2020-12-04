import { readFileSync } from 'fs'
import path from "path";

// read the file
const file = readFileSync(path.join(__dirname, 'data'), "utf-8");
const lines = file.split('\n')

const STEP = 3
const TREE_CHAR = '#'

// get an answer #1
let treeCounter = 0
let position = 0
const lineWidth = lines[0].length
lines.forEach(line => {
    if (line[position] === TREE_CHAR) {
        treeCounter++
    }
    position = (position + STEP) % lineWidth
})
console.log(`Answer #1: ${treeCounter}`)

// get an answer #2
const slopes = [
    { r: 1, d: 1 },
    { r: 3, d: 1 },
    { r: 5, d: 1 },
    { r: 7, d: 1 },
    { r: 1, d: 2 },
]
const treeCounters: number[] = []
slopes.forEach( slope => {
    let treeCounter = 0
    let position = 0
    for (let i = 0; i < lines.length; i = i + slope.d) {
        if (lines[i][position] === TREE_CHAR) {
            treeCounter++
        }
        position = (position + slope.r) % lineWidth
    }
    treeCounters.push(treeCounter)
})
console.log(`Answer #2: ${treeCounters.join(' * ')} = ${treeCounters.reduce((a, b) => a * b, 1)}`)