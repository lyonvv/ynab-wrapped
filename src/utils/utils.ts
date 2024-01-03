import * as ynab from 'ynab';

export const createRecordByField = <T extends object, K extends keyof T>(
  array: T[],
  field: K
): Record<string, T> => {
  return array.reduce((output: Record<string, T>, obj: T) => {
    const key = String(obj[field]);

    if (key) {
      output[key] = obj;
    }

    return output;
  }, {});
};

export const isDateInYear = (date: Date, year: number) => {
  return date.getFullYear() === year;
};

export const isAccountActive = (account: ynab.Account) => {
  return (
    account.closed === false &&
    account.deleted === false &&
    account.on_budget === true
  );
};

export const isAccountCreditCard = (account: ynab.Account) => {
  return account.type === ynab.AccountType.CreditCard;
};

export const isTransactionTransfer = (transaction: ynab.TransactionDetail) => {
  return !transaction.transfer_transaction_id;
};

export const convertYNABValueToDollars = (value: number) => {
  return value / 1000;
};

export const getTransactionsBetweenDates = (
  transactions: ynab.TransactionDetail[],
  startDate?: Date,
  endDate?: Date
) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    return (
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate)
    );
  });
};

export const getTotalAmount = (transactions: ynab.TransactionDetail[]) => {
  return transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
};

export const convertAndFormatYNABAmountToDollars = (amount: number) => {
  return convertYNABValueToDollars(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const STARTING_BALANCE_PAYEE_NAME = 'Starting Balance';

export const getStartingBalanceTransactionForAccount = (
  transactions: ynab.TransactionDetail[],
  accountId: string
) => {
  return transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .find((transaction) => {
      return (
        transaction.payee_name === STARTING_BALANCE_PAYEE_NAME &&
        transaction.account_id === accountId
      );
    });
};

export const calculateExpirationTime = (expiresInSeconds: number) => {
  const currentTime = new Date().getTime();
  return currentTime + expiresInSeconds * 1000;
};
