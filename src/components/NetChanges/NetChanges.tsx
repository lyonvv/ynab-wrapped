import {
  useTransactionsInYear,
  useTransactionsUpToYear,
} from '../../state/ynab';
import { useMemo } from 'react';
import { convertAndFormatYNABAmountToDollars } from '../../utils/utils';
import { Page } from '../Page';

type NetChangesProps = Readonly<{
  id: string;
  scrollProgress: number;
}>;

export function NetChanges({ id, scrollProgress }: NetChangesProps) {
  const transactionsUpToYear = useTransactionsUpToYear();
  const transactionsInYear = useTransactionsInYear();

  const totalAtStartOfYear = useMemo(
    () =>
      transactionsUpToYear.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
    [transactionsUpToYear]
  );

  const changeDuringYear = useMemo(
    () =>
      transactionsInYear.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
    [transactionsInYear]
  );

  const isIncrease = changeDuringYear >= 0;

  const preamble = isIncrease
    ? 'You increased your net worth by '
    : 'Your net worth decreased by ';

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

      <div> {'Scroll Progress' + scrollProgress} </div>
    </Page>
  );
}
