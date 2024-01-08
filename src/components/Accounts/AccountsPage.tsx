import { useMemo } from 'react';
import { useAccountsMap, useTransactionsInYear } from '../../state/ynab';
import { Page } from '../Page';
import * as ynab from 'ynab';

type AccountsPageProps = Readonly<{
  id: string;
}>;

export function AccountsPage({ id }: AccountsPageProps) {
  const acconutsMap = useAccountsMap();

  const transactionsInYear = useTransactionsInYear();

  const transactionsGroupedByAccount = useMemo(
    () =>
      transactionsInYear.reduce(
        (agg, transaction) => {
          if (!(transaction.account_id in agg))
            agg[transaction.account_id] = [];

          agg[transaction.account_id].push(transaction);

          return agg;
        },
        {} as Record<string, ynab.TransactionDetail[]>
      ),
    [transactionsInYear]
  );

  const accounts = useMemo(
    () => Object.keys(transactionsGroupedByAccount).map((k) => acconutsMap[k]),
    [acconutsMap, transactionsGroupedByAccount]
  );

  //how many accounts,
  //number of transactions,
  //net

  return (
    <Page id={id}>
      <div>{`You used ${accounts.length} different accounts this year`}</div>
      <div>
        {accounts.map((a) => (
          <div>{JSON.stringify(a)}</div>
        ))}
      </div>
    </Page>
  );
}
