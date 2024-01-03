import { useMemo } from 'react';
import { convertAndFormatYNABAmountToDollars } from '../../utils/utils';

type TotalNetChangesProps = Readonly<{
  accountsBalanceAtStartOfYear: Record<string, number>;
  accountsYearChange: Record<string, number>;
}>;

export function TotalNetChanges({
  accountsBalanceAtStartOfYear,
  accountsYearChange,
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

  return (
    <div>
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
