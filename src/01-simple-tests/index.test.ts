// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const testObj = {
      a: 3,
      b: 5,
      action: Action.Add,
    };
    expect(simpleCalculator(testObj)).toBe(8);
  });

  test('should subtract two numbers', () => {
    const testObj = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };
    expect(simpleCalculator(testObj)).toBe(2);
  });

  test('should multiply two numbers', () => {
    const testObj = {
      a: 5,
      b: 3,
      action: Action.Multiply,
    };
    expect(simpleCalculator(testObj)).toBe(15);
  });

  test('should divide two numbers', () => {
    const testObj = {
      a: 5,
      b: 3,
      action: Action.Divide,
    };
    expect(simpleCalculator(testObj)).toBeGreaterThan(1.6);
  });

  test('should exponentiate two numbers', () => {
    const testObj = {
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(testObj)).toBe(125);
  });

  test('should return null for invalid action', () => {
    const testObj = {
      a: 5,
      b: 3,
      action: 'lol',
    };
    expect(simpleCalculator(testObj)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const testObj = {
      a: '5',
      b: 3,
      action: 'lol',
    };
    expect(simpleCalculator(testObj)).toBeNull();
  });
});
