import { useEffect, useState } from 'react';
import {
  currentBudgetIdAtom,
  fetchAccounts,
  fetchCategories,
  fetchMonthSummaries,
  fetchPayeeLocations,
  fetchPayees,
  fetchTransactions,
} from '../state/ynab';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../state/auth';
import { StartPage } from './StartPage';
import { NetChanges } from './NetChanges/NetChanges';
import styles from './BudgetWrapped.module.scss';
import { BudgetWrappedPageNavigator } from './BudgetWrappedPageNavigator';

const TOTAL_PAGES = 2;

export function BudgetWrapped() {
  const [accessToken] = useAtom(accessTokenAtom);
  const [selectedBudgetId] = useAtom(currentBudgetIdAtom);

  const [loadingData, setLoadingData] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    setLoadingData(true);
    Promise.all([
      fetchAccounts(accessToken, selectedBudgetId),
      fetchCategories(accessToken, selectedBudgetId),
      fetchMonthSummaries(accessToken, selectedBudgetId),
      fetchPayeeLocations(accessToken, selectedBudgetId),
      fetchPayees(accessToken, selectedBudgetId),
      fetchTransactions(accessToken, selectedBudgetId),
    ]).finally(() => setLoadingData(false));
  }, [accessToken, selectedBudgetId]);

  useEffect(() => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear() - 1);
  }, []);

  return (
    <div className={styles['budget-wrapped-bg']}>
      {loadingData && <div>{'Loading...'}</div>}
      {!loadingData && (
        <div>
          {pageIndex === 0 && <StartPage year={year} />}
          {pageIndex === 1 && <NetChanges year={year} />}
          <BudgetWrappedPageNavigator
            pageIndex={pageIndex}
            totalPages={TOTAL_PAGES}
            setPageIndex={setPageIndex}
          />
        </div>
      )}
    </div>
  );
}
