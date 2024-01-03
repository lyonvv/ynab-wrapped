import { useEffect } from 'react';
import {
  fetchAccounts,
  fetchCategories,
  fetchMonthSummaries,
  fetchPayeeLocations,
  fetchPayees,
  fetchTransactions,
  fetchingYNABDataAtom,
  useCurrentBudgetId,
} from '../state/ynab';
import { useAccessToken } from '../state/auth';
import { globalStore } from '../state/globalStore';
import { selectedYearAtom } from '../state/appState';

export function useFetchYNABData() {
  const accessToken = useAccessToken();
  const selectedBudgetId = useCurrentBudgetId();

  useEffect(() => {
    globalStore.set(fetchingYNABDataAtom, true);
    Promise.all([
      fetchAccounts(accessToken, selectedBudgetId),
      fetchCategories(accessToken, selectedBudgetId),
      fetchMonthSummaries(accessToken, selectedBudgetId),
      fetchPayeeLocations(accessToken, selectedBudgetId),
      fetchPayees(accessToken, selectedBudgetId),
      fetchTransactions(accessToken, selectedBudgetId),
    ]).finally(() => globalStore.set(fetchingYNABDataAtom, false));
  }, [accessToken, selectedBudgetId]);

  useEffect(() => {
    const currentDate = new Date();
    globalStore.set(selectedYearAtom, currentDate.getFullYear() - 1);
  }, []);
}
