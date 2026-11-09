import { expect, test } from 'vitest';
import { parseStock } from './stock.js';
test.each(['', ' ', '-1', '1.5', 'abc', 'Infinity', '9007199254740992'])('rejects invalid stock %j', (raw) => {
  expect(() => parseStock(raw)).toThrow('Stok harus');
});
test.each([['0', 0], [' 9 ', 9], ['10', 10]])('accepts integer %j', (raw, expected) => {
  expect(parseStock(raw)).toBe(expected);
});
