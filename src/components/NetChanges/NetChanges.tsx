import { useAccountsMap, useTransactions } from '../../state/ynab';
import { useMemo } from 'react';
import * as ynab from 'ynab';
import {
  getStartingBalanceTransactionForAccount,
  getTransactionsBetweenDates,
} from '../../utils/utils';
import { NetChangesRow } from './NetChangesRow';

type NetChangesProps = Readonly<{
  year: number;
}>;

export function NetChanges({ year }: NetChangesProps) {
  const transactions = useTransactions();
  const accountsMap = useAccountsMap();

  const transactionsUpToYear = useMemo(
    () =>
      getTransactionsBetweenDates(
        transactions,
        undefined,
        new Date(year, 0, 1)
      ),
    [transactions, year]
  );

  const transactionsInYear = useMemo(
    () =>
      getTransactionsBetweenDates(
        transactions,
        new Date(year, 0, 1),
        new Date(year + 1, 0, 1)
      ),
    [transactions, year]
  );

  const getAmountTotalsByAccount = (
    transactions: ynab.TransactionDetail[],
    accountsMap: Record<string, ynab.Account>
  ) =>
    transactions.reduce((acc, transaction) => {
      const account = accountsMap[transaction.account_id];

      if (!(account.id in acc)) {
        acc[account.id] = 0;
      }

      acc[account.id] += transaction.amount;

      return acc;
    }, {} as Record<string, number>);

  const accountsBalanceAtStartOfYear = useMemo(
    () => getAmountTotalsByAccount(transactionsUpToYear, accountsMap),
    [accountsMap, transactionsUpToYear]
  );

  const accountsStartingBalanceTransactions = useMemo(
    () =>
      Object.keys(accountsMap).reduce((acc, accountId) => {
        const startingBalanceTransaction =
          getStartingBalanceTransactionForAccount(transactions, accountId);

        if (startingBalanceTransaction) {
          acc[accountId] = startingBalanceTransaction;
        }

        return acc;
      }, {} as Record<string, ynab.TransactionDetail>),

    [accountsMap, transactions]
  );

  const accountsYearChange = useMemo(
    () => getAmountTotalsByAccount(transactionsInYear, accountsMap),

    [accountsMap, transactionsInYear]
  );

  return (
    <div>
      <div>Net Changes</div>

      <div>
        <div>
          {
            'Here are all of your accounts, and the changes they went through this year'
          }
        </div>
        <div>
          {Object.values(accountsMap).map((account) => (
            <NetChangesRow
              account={account}
              year={year}
              accountBalanceAtStartOfYear={
                accountsBalanceAtStartOfYear[account.id]
              }
              accountStartingBalanceTransaction={
                accountsStartingBalanceTransactions[account.id]
              }
              accountYearChange={accountsYearChange[account.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
