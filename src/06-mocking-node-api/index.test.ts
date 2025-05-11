// Uncomment the code below and write your tests

import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

jest.mock('path', () => {
  const originalPath = jest.requireActual('path');
  return {
    ...originalPath,
    join: jest.fn(),
  };
});

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fn = jest.fn();
    doStuffByTimeout(fn, 2000);
    expect(setTimeout).toHaveBeenCalledWith(fn, 2000);
  });

  test('should call callback only after timeout', () => {
    const fn = jest.fn();
    doStuffByTimeout(fn, 2000);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(fn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const fn = jest.fn();
    doStuffByInterval(fn, 1000);
    expect(setInterval).toHaveBeenCalledWith(fn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fn = jest.fn();
    doStuffByInterval(fn, 1000);
    jest.advanceTimersByTime(5000);
    expect(fn).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const joinMock = path.join as jest.Mock;
  const existMock = existsSync as jest.Mock;
  const readFileMock = readFile as jest.Mock;

  test('should call join with pathToFile', async () => {
    joinMock.mockReturnValue('./test.js');
    existMock.mockReturnValue(false);
    await readFileAsynchronously('test.js');
    expect(joinMock).toHaveBeenCalledWith(__dirname, 'test.js');
  });

  test('should return null if file does not exist', async () => {
    joinMock.mockReturnValue('./test.js');
    existMock.mockReturnValue(false);
    const readFile = await readFileAsynchronously('test.js');
    expect(readFile).toBeNull();
    expect(readFileMock).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    joinMock.mockReturnValue('./test.js');
    existMock.mockReturnValue(true);
    readFileMock.mockReturnValue('file content');
    const readFile = await readFileAsynchronously('test.js');
    expect(readFile).toBe('file content');
  });
});
