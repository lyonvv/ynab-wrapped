import { useAtom } from 'jotai';
import { accessTokenAtom } from '../state/auth';
import { useEffect, useState } from 'react';
import {
  currentBudgetIdAtom,
  fetchBudgetSummaries,
  useBudgetSummaries,
} from '../state/ynab';
import { BudgetSelector } from './BudgetSelector';
import { BudgetWrapped } from './BudgetWrapped';

export function Main() {
  const [accessToken] = useAtom(accessTokenAtom);
  const [selectedBudgetId] = useAtom(currentBudgetIdAtom);

  const [fetchingBudgets, setFetchingBudgets] = useState(false);

  const budgets = useBudgetSummaries();

  useEffect(() => {
    if (selectedBudgetId) return;
    setFetchingBudgets(true);
    fetchBudgetSummaries(accessToken).finally(() => setFetchingBudgets(false));
  }, [accessToken, selectedBudgetId]);

  return (
    <div>
      {!selectedBudgetId && !fetchingBudgets && (
        <BudgetSelector budgets={budgets} />
      )}
      {fetchingBudgets && <div>{'Loading...'}</div>}
      {selectedBudgetId && <BudgetWrapped />}
    </div>
  );
}
