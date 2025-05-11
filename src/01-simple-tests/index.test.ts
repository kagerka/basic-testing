// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 7, b: 1, action: Action.Add });
    expect(res).toBe(8);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 6, b: 4, action: Action.Subtract });
    expect(res).toBe(2);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 5, action: Action.Multiply });
    expect(res).toBe(10);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 9, b: 3, action: Action.Divide });
    expect(res).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(res).toBe(8);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 7, b: 3, action: 'Action.Add' });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res1 = simpleCalculator({ a: 3, b: null, action: Action.Add });
    expect(res1).toBeNull();

    const res2 = simpleCalculator({ a: 3, b: '1', action: Action.Add });
    expect(res2).toBeNull();

    const res3 = simpleCalculator({
      a: 3,
      b: undefined,
      action: Action.Add,
    });
    expect(res3).toBeNull();

    const res4 = simpleCalculator({
      a: 3,
      b: [1],
      action: Action.Add,
    });
    expect(res4).toBeNull();

    const res5 = simpleCalculator({
      a: 3,
      b: { b: 1 },
      action: Action.Add,
    });
    expect(res5).toBeNull();
  });
});
