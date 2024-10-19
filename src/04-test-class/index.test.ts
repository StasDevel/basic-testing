// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import {
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initBalance = 100;
    expect(getBankAccount(initBalance).getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initBalance = 100;
    const getMoney = 200;

    expect(() => getBankAccount(initBalance).withdraw(getMoney)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initBalance = 100;
    const transferMoney = 200;
    const account = getBankAccount(initBalance);
    expect(() => account.withdraw(transferMoney)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initBalance = 100;
    const transferMoney = 200;
    const account = getBankAccount(initBalance);
    expect(() => account.transfer(transferMoney, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(100).deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(100).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const transferFrom = getBankAccount(1000);
    const transferTo = getBankAccount(0);
    const transferValue = 100;
    expect(() => transferFrom.transfer(transferValue, transferFrom)).toThrow(
      TransferFailedError,
    );
    transferFrom.transfer(transferValue, transferTo);
    expect(transferFrom.getBalance()).toBe(1000 - transferValue);
    expect(transferTo.getBalance()).toBe(transferValue);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const res = await getBankAccount(100).fetchBalance();
    if (res !== null) {
      expect(typeof res).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const error = new SynchronizationFailedError();
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).not.toBe(100);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toMatch(error.message);
      }
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const error = new SynchronizationFailedError();
    getBankAccount(300)
      .fetchBalance()
      .catch((err) => {
        if (err instanceof Error) {
          expect(err.message).toThrow(error);
        }
      });
  });
});
