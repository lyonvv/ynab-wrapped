import { useAccountsMap, useTransactions } from '../../state/ynab';
import { useMemo } from 'react';
import * as ynab from 'ynab';
import { getTransactionsBetweenDates } from '../../utils/utils';
import { TotalNetChanges } from './TotalNetChanges';
import { useSelectedYear } from '../../state/appState';
import { Page } from '../Page';

type NetChangesProps = Readonly<{
  id: string;
  pageSectionIndex: number;
}>;

export function NetChanges({ id, pageSectionIndex }: NetChangesProps) {
  const transactions = useTransactions();
  const accountsMap = useAccountsMap();
  const year = useSelectedYear();

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

  const accountsYearChange = useMemo(
    () => getAmountTotalsByAccount(transactionsInYear, accountsMap),

    [accountsMap, transactionsInYear]
  );

  return (
    <Page id={id}>
      <div>Net Changes</div>
      <TotalNetChanges
        accountsBalanceAtStartOfYear={accountsBalanceAtStartOfYear}
        accountsYearChange={accountsYearChange}
      />
      <div> {'page section index: ' + pageSectionIndex} </div>
    </Page>
  );
}
