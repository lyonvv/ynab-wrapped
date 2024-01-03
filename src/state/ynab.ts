import * as ynab from 'ynab';
import { atom, useAtomValue } from 'jotai';
import { globalStore } from './globalStore';
import { createRecordByField } from '../utils/utils';

export const budgetSummariesAtom = atom<ynab.BudgetSummary[]>([]);

export const currentBudgetIdAtom = atom<string | null>('default');

export const transactionsAtom = atom<ynab.TransactionDetail[]>([]);

export const categoriesAtom = atom<ynab.Category[]>([]);

export const accountsAtom = atom<ynab.Account[]>([]);

export const payeesAtom = atom<ynab.Payee[]>([]);

export const payeeLocationsAtom = atom<ynab.PayeeLocation[]>([]);

export const monthSummariesAtom = atom<ynab.MonthSummary[]>([]);

export const fetchBudgetSummaries = async (accessToken: string | null) => {
  if (!accessToken) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.budgets
    .getBudgets()
    .then((res: { data: { budgets: ynab.BudgetSummary[] } }) => {
      globalStore.set(budgetSummariesAtom, res.data.budgets);
    });
};

export const useBudgetSummaries = () => {
  return useAtomValue(budgetSummariesAtom);
};

export const useBudgetSummariesMap = () => {
  return createRecordByField(useBudgetSummaries(), 'id');
};

export const fetchTransactions = async (
  accessToken: string | null,
  budgetId: string | null
) => {
  if (!accessToken || !budgetId) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.transactions
    .getTransactions(budgetId)
    .then((res: { data: { transactions: any[] } }) => {
      globalStore.set(transactionsAtom, res.data.transactions);
    });
};

export const useTransactions = () => {
  return useAtomValue(transactionsAtom);
};

export const useTransactionsMap = () => {
  return createRecordByField(useTransactions(), 'id');
};

export const fetchCategories = async (
  accessToken: string | null,
  budgetId: string | null
) => {
  if (!accessToken || !budgetId) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.categories
    .getCategories(budgetId)
    .then(
      (res: {
        data: { category_groups: ynab.CategoryGroupWithCategories[] };
      }) => {
        const categories = res.data.category_groups.flatMap(
          (group: ynab.CategoryGroupWithCategories) => group.categories
        );

        globalStore.set(categoriesAtom, categories);
      }
    );
};

export const useCategories = () => {
  return useAtomValue(categoriesAtom);
};

export const useCategoriesMap = () => {
  return createRecordByField(useCategories(), 'id');
};

export const fetchAccounts = async (
  accessToken: string | null,
  budgetId: string | null
) => {
  if (!accessToken || !budgetId) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.accounts
    .getAccounts(budgetId)
    .then((res: { data: { accounts: ynab.Account[] } }) => {
      globalStore.set(accountsAtom, res.data.accounts);
    });
};

export const useAccounts = () => {
  return useAtomValue(accountsAtom);
};

export const useAccountsMap = () => {
  return createRecordByField(useAccounts(), 'id');
};

export const fetchPayees = async (
  accessToken: string | null,
  budgetId: string | null
) => {
  if (!accessToken || !budgetId) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.payees
    .getPayees(budgetId)
    .then((res: { data: { payees: any[] } }) => {
      globalStore.set(payeesAtom, res.data.payees);
    });
};

export const usePayees = () => {
  return useAtomValue(payeesAtom);
};

export const usePayeesMap = () => {
  return createRecordByField(usePayees(), 'id');
};

export const fetchPayeeLocations = async (
  accessToken: string | null,
  budgetId: string | null
) => {
  if (!accessToken || !budgetId) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.payeeLocations
    .getPayeeLocations(budgetId)
    .then((res: { data: { payee_locations: any[] } }) => {
      globalStore.set(payeeLocationsAtom, res.data.payee_locations);
    });
};

export const usePayeeLocations = () => {
  return useAtomValue(payeeLocationsAtom);
};

export const usePayeeLocationsMap = () => {
  return createRecordByField(usePayeeLocations(), 'id');
};

export const fetchMonthSummaries = async (
  accessToken: string | null,
  budgetId: string | null
) => {
  if (!accessToken || !budgetId) return;

  const ynabApi = new ynab.API(accessToken);
  await ynabApi.months
    .getBudgetMonths(budgetId)
    .then((res: { data: { months: any[] } }) => {
      globalStore.set(monthSummariesAtom, res.data.months);
    });
};

export const useMonthSummaries = () => {
  return useAtomValue(monthSummariesAtom);
};

export const useMonthSummariesMap = () => {
  return createRecordByField(useMonthSummaries(), 'month');
};
