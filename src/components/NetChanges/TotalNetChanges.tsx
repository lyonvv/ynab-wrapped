import { useMemo } from 'react';
import { convertAndFormatYNABAmountToDollars } from '../../utils/utils';
import styles from './NetChanges.module.scss';
import classNames from 'classnames';

type TotalNetChangesProps = Readonly<{
  accountsBalanceAtStartOfYear: Record<string, number>;
  accountsYearChange: Record<string, number>;
  scrollProgress: number;
}>;

export function TotalNetChanges({
  accountsBalanceAtStartOfYear,
  accountsYearChange,
  scrollProgress,
}: TotalNetChangesProps) {
  const totalBalanceAtStartOfYear = useMemo(
    () =>
      Object.values(accountsBalanceAtStartOfYear).reduce(
        (acc, amount) => acc + amount,
        0
      ),
    [accountsBalanceAtStartOfYear]
  );

  const totalYearChange = useMemo(
    () =>
      Object.values(accountsYearChange).reduce(
        (acc, amount) => acc + amount,
        0
      ),
    [accountsYearChange]
  );

  const classes = classNames('bg-secondary', styles['total-net-changes'], {
    [styles['visible']]: scrollProgress >= 0.5,
  });

  return (
    <div className={classes}>
      <div>Total Changes</div>
      <div>{'Starting Balance'}</div>
      <div>
        {convertAndFormatYNABAmountToDollars(totalBalanceAtStartOfYear)}
      </div>
      <div>{'Change'}</div>
      <div>{convertAndFormatYNABAmountToDollars(totalYearChange)}</div>
      <div>{'Ending Balance'}</div>
      <div>
        {convertAndFormatYNABAmountToDollars(
          totalBalanceAtStartOfYear + totalYearChange
        )}
      </div>
    </div>
  );
}
