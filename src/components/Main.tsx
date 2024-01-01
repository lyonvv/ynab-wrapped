import { useAtom } from 'jotai';
import { accessTokenAtom } from '../state/auth';
import { useEffect, useState } from 'react';
import { currentBudgetIdAtom } from '../state/ynab';
import { BudgetSelector } from './BudgetSelector';
import { useBudgetSummaries, useTransactions } from '../services/ynabApiHelper';
import { BudgetWrapped } from './BudgetWrapped';

export function Main() {
  const [accessToken] = useAtom(accessTokenAtom);
  const [selectedBudgetId] = useAtom(currentBudgetIdAtom);

  const [fetchingBudgets, setFetchingBudgets] = useState(false);

  const fetchBudgets = useBudgetSummaries(accessToken);
  const fetchTransactions = useTransactions(accessToken, selectedBudgetId);

  useEffect(() => {
    setFetchingBudgets(true);
    fetchBudgets().finally(() => setFetchingBudgets(false));
  }, [fetchBudgets]);

  return (
    <div>
      {!selectedBudgetId && !fetchingBudgets && <BudgetSelector />}
      {fetchingBudgets && <div>{'Loading...'}</div>}
      {selectedBudgetId && <BudgetWrapped />}
    </div>
  );
}
