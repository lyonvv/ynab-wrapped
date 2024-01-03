import * as ynab from 'ynab';
import { convertAndFormatYNABAmountToDollars } from '../../utils/utils';

type NetChangesRowProps = Readonly<{
  account: ynab.Account;
  year: number;
  accountBalanceAtStartOfYear: number;
  accountStartingBalanceTransaction: ynab.TransactionDetail;
  accountYearChange: number;
}>;

export function NetChangesRow({
  account,
  year,
  accountBalanceAtStartOfYear,
  accountYearChange,
  accountStartingBalanceTransaction,
}: NetChangesRowProps) {
  const accountStartingBalanceTransactionDate = new Date(
    accountStartingBalanceTransaction?.date
  );

  return (
    <div key={account.id}>
      <div>{account.name}</div>
      <div>
        {convertAndFormatYNABAmountToDollars(
          accountStartingBalanceTransactionDate.getFullYear() < year
            ? accountBalanceAtStartOfYear
            : accountStartingBalanceTransaction?.amount ?? 0
        )}
      </div>
      <div>{convertAndFormatYNABAmountToDollars(accountYearChange)}</div>
      <div>
        {convertAndFormatYNABAmountToDollars(
          accountBalanceAtStartOfYear + accountYearChange
        )}
      </div>
    </div>
  );
}
