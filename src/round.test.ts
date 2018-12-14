import round from './round';

test('round integer', () => {
  expect(round(5.123456, 0)).toBe(5);
});

test('round negative', () => {
  expect(round(-5.123456, 0)).toBe(-5);
});

test('round down', () => {
  expect(round(1.123456, 2)).toBe(1.12);
});

test('round up', () => {
  expect(round(1.98765, 2)).toBe(1.99);
});
