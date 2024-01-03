import { currentBudgetIdAtom } from '../state/ynab';
import * as ynab from 'ynab';
import { useSetAtom } from 'jotai';

type BudgetSelectorProps = Readonly<{
  budgets: ynab.BudgetSummary[];
}>;

export function BudgetSelector({ budgets }: BudgetSelectorProps) {
  const setCurrentBudgetId = useSetAtom(currentBudgetIdAtom);

  return (
    <div>
      {budgets.map((budget) => (
        <div key={budget.id}>
          <button onClick={() => setCurrentBudgetId(budget.id)}>
            {budget.name}
          </button>
        </div>
      ))}
    </div>
  );
}
