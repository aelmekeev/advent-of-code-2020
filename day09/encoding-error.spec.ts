import { findContiguousSet, validateNumbers } from './encoding-error'

const TEST_DATA = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
]
const INVALID_NUMBER = 127

test('Find first invalid number', () => {
    const number = validateNumbers(TEST_DATA, 5)
    expect(number).toEqual(INVALID_NUMBER)
})

test('Find set with sum', () => {
    const set = findContiguousSet(TEST_DATA, INVALID_NUMBER)
    expect(set.join(',')).toEqual([15, 25, 47, 40].join(','))
})