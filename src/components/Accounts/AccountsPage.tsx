import { useMemo } from 'react';
import { useAccountsMap, useTransactionsInYear } from '../../state/ynab';
import { Page } from '../Page';
import * as ynab from 'ynab';
import { AccountRow } from './AccountRow';

type AccountsPageProps = Readonly<{
  id: string;
  scrollProgress: number;
}>;

export function AccountsPage({ id, scrollProgress }: AccountsPageProps) {
  const accountsMap = useAccountsMap();

  const transactionsInYear = useTransactionsInYear();

  const transactionsGroupedByAccount = useMemo(
    () =>
      transactionsInYear.reduce((agg, transaction) => {
        if (!(transaction.account_id in agg)) agg[transaction.account_id] = [];

        agg[transaction.account_id].push(transaction);

        return agg;
      }, {} as Record<string, ynab.TransactionDetail[]>),
    [transactionsInYear]
  );

  const accountIds = useMemo(
    () => Object.keys(transactionsGroupedByAccount),
    [transactionsGroupedByAccount]
  );

  return (
    <Page id={id} scrollProgress={scrollProgress}>
      <div>{`You used ${accountIds.length} different accounts this year`}</div>
      <div>
        {[
          ...Object.entries(transactionsGroupedByAccount)
            .sort(([, transactionsA], [, transactionsB]) => {
              return transactionsB.length - transactionsA.length;
            })
            .map(([accountId, transactions]) => (
              <AccountRow
                account={accountsMap[accountId]}
                transactions={transactions}
              />
            )),
        ]}
      </div>
    </Page>
  );
}
