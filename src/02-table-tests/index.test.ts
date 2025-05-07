// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 4, action: Action.Subtract, expected: 2 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  { a: 8, b: 4, action: Action.Subtract, expected: 4 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 3, b: 5, action: Action.Multiply, expected: 15 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 7, b: 3, action: 'Action.Add', expected: null },
  { a: 3, b: null, action: Action.Add, expected: null },
  { a: 3, b: '1', action: Action.Add, expected: null },
  { a: 3, b: undefined, action: Action.Add, expected: null },
  { a: 3, b: [1], action: Action.Add, expected: null },
  { a: 3, b: { b: 1 }, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'The result of $a $action $b should be $expected.',
    ({ a, b, action, expected }) => {
      const res = simpleCalculator({ a, b, action });
      expect(res).toBe(expected);
    },
  );
});
