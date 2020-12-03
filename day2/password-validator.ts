import { readFileSync } from 'fs'

// read the file
const file = readFileSync('./data', 'utf-8')
const passwords = file.split('\n').map(d => {
    const parts = d.match(/(\d+)-(\d+) (\w): (\w+)/)
    return {
        min: +parts![1],
        max: +parts![2],
        char: parts![3],
        pass: parts![4]
    }
})

// get count of correct passwords #1
console.log(passwords.filter(p => {
    const count = p.pass.split('').filter(c => c === p.char).length
    return count >= p.min && count <= p.max
}).length)

// get count of correct passwords #2
console.log(passwords.filter(p => (p.pass[p.min-1] === p.char) !== (p.pass[p.max-1] === p.char)).length)