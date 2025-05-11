// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 500;
    const amount = 1000;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(amount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balanceOne = 500;
    const balanceTwo = 500;
    const transferAmount = 1000;
    const accountOne = getBankAccount(balanceOne);
    const accountTwo = getBankAccount(balanceTwo);
    expect(() => accountOne.transfer(transferAmount, accountTwo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 500;
    const transferAmount = 100;
    const account = getBankAccount(balance);
    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 500;
    const amount = 100;
    const account = getBankAccount(balance);
    account.deposit(amount);
    expect(account.getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const balance = 500;
    const amount = 100;
    const account = getBankAccount(balance);
    account.withdraw(amount);
    expect(account.getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const balanceOne = 500;
    const balanceTwo = 500;
    const amount = 100;
    const accountOne = getBankAccount(balanceOne);
    const accountTwo = getBankAccount(balanceTwo);
    accountOne.transfer(amount, accountTwo);
    expect(accountOne.getBalance()).toBe(balanceOne - amount);
    expect(accountTwo.getBalance()).toBe(balanceTwo + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 500;
    const account = getBankAccount(balance);
    const value = 50;
    const fn = jest.spyOn(account, 'fetchBalance').mockResolvedValue(value);
    const fetchedBalance = await account.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
    fn.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 500;
    const account = getBankAccount(balance);
    const value = 50;
    const fn = jest.spyOn(account, 'fetchBalance').mockResolvedValue(value);
    const fetchedBalance = await account.fetchBalance();
    if (typeof fetchedBalance === 'number') {
      await account.synchronizeBalance();
      expect(account.getBalance()).toBe(value);
    }
    fn.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 500;
    const account = getBankAccount(balance);
    const fn = jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    const fetchedBalance = await account.fetchBalance();
    if (typeof fetchedBalance === null) {
      await expect(account.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
      );
    }
    fn.mockRestore();
  });
});
