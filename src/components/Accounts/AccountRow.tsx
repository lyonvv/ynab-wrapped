import * as ynab from 'ynab';
import { convertAndFormatYNABAmountToDollars } from '../../utils/utils';
import { useMemo } from 'react';

type AccountRowProps = Readonly<{
  account: ynab.Account;
  transactions: ynab.TransactionDetail[];
}>;

export function AccountRow({ account, transactions }: AccountRowProps) {
  const total = useMemo(() => {
    const total = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    return total;
  }, [transactions]);

  return (
    <div>
      <div>{account.name}</div>
      <div>{account.closed ? 'Closed' : 'Open'}</div>
      <div>{`${
        transactions.length
      } transactions were made, totaling ${convertAndFormatYNABAmountToDollars(
        total
      )}`}</div>
    </div>
  );
}
