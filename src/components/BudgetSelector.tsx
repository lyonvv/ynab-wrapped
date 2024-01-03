import { currentBudgetIdAtom, useBudgetSummaries } from '../state/ynab';
import * as ynab from 'ynab';
import { useEffect, useMemo } from 'react';
import { globalStore } from '../state/globalStore';
import { useAtom, useAtomValue } from 'jotai';


type BudgetSelectorProps = Readonly<{
  budgets: ynab.BudgetSummary[];
}>;

export function BudgetSelector({budgets}: BudgetSelectorProps) {
  const [currentBudgetId, setCurrentBudgetId] = useAtom(currentBudgetIdAtom);



  return (
    
  );
}
