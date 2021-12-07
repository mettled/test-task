import calculation from '../src/calculation';

test('addition', () => {
  const actual = calculation['addition'](1, 2);
  expect(actual).toBe(3);
});

test('division', () => {
  const actual = calculation['division'](6, 3);
  expect(actual).toBe(2);
});

test('multiplication', () => {
  const actual = calculation['multiplication'](11, 2);
  expect(actual).toBe(22);
});

test('remainder', () => {
  const actual = calculation['remainder'](7, 2);
  expect(actual).toBe(1);
});

test('subtraction', () => {
  const actual = calculation['subtraction'](15, 2);
  expect(actual).toBe(13);
});
