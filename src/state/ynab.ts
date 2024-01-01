import * as ynab from 'ynab';
import { atom } from 'jotai';

export const budgetSummariesAtom = atom<ynab.BudgetSummary[]>([]);

export const currentBudgetIdAtom = atom<string | null>(null);

export const transactionsAtom = atom<ynab.TransactionDetail[]>([]);

export const categoriesAtom = atom<ynab.Category[]>([]);

export const accountsAtom = atom<ynab.Account[]>([]);

export const payeesAtom = atom<ynab.Payee[]>([]);

export const payeeLocationsAtom = atom<ynab.PayeeLocation[]>([]);

export const monthSummariesAtom = atom<ynab.MonthSummary[]>([]);
