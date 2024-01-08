import { useExternalTransactions } from '../../state/ynab';
import { useMemo } from 'react';
import { Page } from '../Page';
import * as ynab from 'ynab';

type CategoriesPageProps = Readonly<{
  id: string;
  scrollProgress: number;
}>;

export const CategoriesPage = ({ id, scrollProgress }: CategoriesPageProps) => {
  const transactions = useExternalTransactions();

  const transactionsGroupedByCategory = useMemo(
    () =>
      transactions
        .filter((t) => !!t.category_id)
        .reduce((agg, transaction) => {
          if (!(transaction.category_id! in agg))
            agg[transaction.category_id!] = [];

          agg[transaction.category_id!].push(transaction);

          return agg;
        }, {} as Record<string, ynab.TransactionDetail[]>),
    [transactions]
  );

  const totalSpendingByCategory = useMemo(
    () =>
      Object.entries(transactionsGroupedByCategory)
        .map(([categoryId, transactions]) => ({
          categoryId,
          total: transactions.reduce(
            (total, transaction) => total + transaction.amount,
            0
          ),
        }))
        .sort((a, b) => b.total - a.total),
    [transactionsGroupedByCategory]
  );

  return (
    <Page id={id} scrollProgress={scrollProgress}>
      {totalSpendingByCategory.map(({ categoryId, total }) => (
        <div>{`${categoryId} - ${total}`}</div>
      ))}
    </Page>
  );
};
