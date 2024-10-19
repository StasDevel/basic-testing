// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mocked = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const time = 300;
    doStuffByTimeout(callback, time);
    expect(mocked).toHaveBeenCalledTimes(1);
    expect(mocked).toHaveBeenCalledWith(callback, time);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 300;
    doStuffByTimeout(callback, time);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mocked = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const time = 300;
    doStuffByInterval(callback, time);
    expect(mocked).toHaveBeenLastCalledWith(callback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const time = 300;
    const callback = jest.fn();
    for (let i = 0; i < 3; i++) {
      doStuffByInterval(callback, 500);
    }
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(time);
    expect(setInterval).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const fileUrl = './read.txt';
    await readFileAsynchronously(fileUrl);
    expect(join).toHaveBeenCalledWith(__dirname, fileUrl);
  });

  test('should return null if file does not exist', async () => {
    const fileUrl = './read.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const fileContent = await readFileAsynchronously(fileUrl);
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
