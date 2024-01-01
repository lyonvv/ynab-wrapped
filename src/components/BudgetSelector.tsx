import { Select, ItemRenderer } from '@blueprintjs/select';
import { Button } from '@blueprintjs/core';
import { useAtom } from 'jotai';
import { budgetSummariesAtom, currentBudgetIdAtom } from '../state/ynab';
import * as ynab from 'ynab';
import { useMemo } from 'react';

export function BudgetSelector() {
  const [budgets] = useAtom(budgetSummariesAtom);
  const [selectedBudgetId, setSelectedBudgetId] = useAtom(currentBudgetIdAtom);

  const selectedBudget = useMemo(
    () => budgets.find((budget) => budget.id === selectedBudgetId),
    [budgets, selectedBudgetId]
  );

  const renderBudget: ItemRenderer<ynab.BudgetSummary> = (
    budget,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <Button
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={budget.id}
        onClick={handleClick}
        text={`${budget.name}`}
      />
    );
  };

  return (
    <Select<ynab.BudgetSummary>
      items={budgets}
      itemRenderer={renderBudget}
      onItemSelect={(budget) => setSelectedBudgetId(budget.id)}
      filterable={false}
    >
      <Button
        text={selectedBudget?.name ?? 'Select a budget'}
        rightIcon="double-caret-vertical"
      />
    </Select>
  );
}
