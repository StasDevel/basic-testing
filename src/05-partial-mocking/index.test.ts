// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(console, 'log').mockImplementation((): null => null);
    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const logFunc = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(logFunc).toBeCalled();
  });
});
