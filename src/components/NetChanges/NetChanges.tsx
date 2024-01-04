import { useAccountsMap, useTransactions } from '../../state/ynab';
import { useMemo } from 'react';
import * as ynab from 'ynab';
import {
  convertAndFormatYNABAmountToDollars,
  getTransactionsBetweenDates,
} from '../../utils/utils';
import { useSelectedYear } from '../../state/appState';
import { Page } from '../Page';
import { AnimatedNetWorthGraph } from './AnimatedNetWorthGraph';

type NetChangesProps = Readonly<{
  id: string;
  scrollProgress: number;
}>;

export function NetChanges({ id, scrollProgress }: NetChangesProps) {
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

  const totalAtStartOfYear = useMemo(
    () =>
      transactionsUpToYear.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
    [accountsMap, transactionsUpToYear]
  );

  const changeDuringYear = useMemo(
    () =>
      transactionsInYear.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
    [accountsMap, transactionsInYear]
  );

  const sortedTransactionsInYear = useMemo(
    () =>
      transactionsInYear.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getDate()
      ),
    [transactionsInYear]
  );

  const netWorthInYear = useMemo(() => {
    let cumulativeNetWorth = totalAtStartOfYear;
    const netWorthMap: Record<string, number> = {};

    sortedTransactionsInYear.forEach((transaction) => {
      const dateStr = new Date(transaction.date).toISOString().split('T')[0];
      cumulativeNetWorth += transaction.amount;
      netWorthMap[dateStr] = cumulativeNetWorth;
    });

    return Object.entries(netWorthMap).map(([date, netWorth]) => {
      return {
        date: new Date(date),
        netWorth,
      };
    });
  }, [sortedTransactionsInYear]);

  const isIncrease = changeDuringYear >= 0;

  const preamble = isIncrease
    ? 'You increased your net worth by '
    : 'Your net worth decreased by ';

  const getNetWorthGraphAnimationProgress = (scrollProgress: number) => {
    const start = 0.5;
    const end = 0.8;
    const range = end - start;
    const progress = Math.max(0, Math.min(1, (scrollProgress - start) / range));
    return progress;
  };

  return (
    <Page id={id}>
      <div>Net Changes</div>
      <div>
        <div>{preamble}</div>
        <div>{convertAndFormatYNABAmountToDollars(changeDuringYear)}</div>
      </div>
      <div>
        <div>{'You started the year at '}</div>
        <div>{convertAndFormatYNABAmountToDollars(totalAtStartOfYear)}</div>
      </div>
      <div>
        <div>{'You ended the year at '}</div>
        <div>
          {convertAndFormatYNABAmountToDollars(
            totalAtStartOfYear + changeDuringYear
          )}
        </div>
      </div>
      <AnimatedNetWorthGraph
        animationProgress={getNetWorthGraphAnimationProgress(scrollProgress)}
        data={netWorthInYear ?? []}
      />

      <div> {'Scroll Progress' + scrollProgress} </div>
    </Page>
  );
}
