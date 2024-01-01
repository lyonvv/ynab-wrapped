import * as ynab from 'ynab';
import {
  accountsAtom,
  budgetSummariesAtom,
  categoriesAtom,
  monthSummariesAtom,
  payeeLocationsAtom,
  payeesAtom,
  transactionsAtom,
} from '../state/ynab';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useBudgetSummaries = (accessToken: string | null) => {
  const [, setBudgetSummaries] = useAtom(budgetSummariesAtom);

  const getAndStoreBudgets = useCallback(async () => {
    if (!accessToken) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.budgets.getBudgets();
    setBudgetSummaries(response.data.budgets);
  }, [accessToken, setBudgetSummaries]);

  return getAndStoreBudgets;
};

export const useTransactions = (
  accessToken: string | null,
  budgetId: string | null
) => {
  const [, setTransactions] = useAtom(transactionsAtom);

  const getAndStoreTransactions = async () => {
    if (!accessToken || !budgetId) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.transactions.getTransactions(budgetId);
    setTransactions(response.data.transactions);
  };

  return getAndStoreTransactions;
};

export const useCategories = (
  accessToken: string | null,
  budgetId: string | null
) => {
  const [, setCategories] = useAtom(categoriesAtom);

  const getAndStoreCategories = async () => {
    if (!accessToken || !budgetId) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.categories.getCategories(budgetId);
  };

  return getAndStoreCategories;
};

export const useAccounts = (
  accessToken: string | null,
  budgetId: string | null
) => {
  const [, setAccounts] = useAtom(accountsAtom);

  const getAndStoreAccounts = async () => {
    if (!accessToken || !budgetId) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.accounts.getAccounts(budgetId);

    setAccounts(response.data.accounts);
  };

  return getAndStoreAccounts;
};

export const usePayees = (
  accessToken: string | null,
  budgetId: string | null
) => {
  const [, setPayees] = useAtom(payeesAtom);

  const getAndStorePayees = async () => {
    if (!accessToken || !budgetId) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.payees.getPayees(budgetId);

    setPayees(response.data.payees);
  };

  return getAndStorePayees;
};

export const usePayeeLocations = (
  accessToken: string | null,
  budgetId: string | null
) => {
  const [, setPayeeLocations] = useAtom(payeeLocationsAtom);

  const getAndStorePayeeLocations = async () => {
    if (!accessToken || !budgetId) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.payeeLocations.getPayeeLocations(budgetId);

    setPayeeLocations(response.data.payee_locations);
  };

  return getAndStorePayeeLocations;
};

export const useMonthSummaries = (
  accessToken: string | null,
  budgetId: string | null
) => {
  const [, setMonths] = useAtom(monthSummariesAtom);

  const getAndStoreMonths = async () => {
    if (!accessToken || !budgetId) return;

    const ynabApi = new ynab.API(accessToken);
    const response = await ynabApi.months.getBudgetMonths(budgetId);

    setMonths(response.data.months);
  };

  return getAndStoreMonths;
};
