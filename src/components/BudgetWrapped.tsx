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
    <div>
      {loadingData && <div>{'Loading...'}</div>}
      {!loadingData && (
        <div>
          {pageIndex === 0 && <StartPage year={year} />}
          {pageIndex === 1 && <NetChanges year={year} />}
          <div>
            <button
              disabled={pageIndex === 0}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              {'Previous'}
            </button>
            <div>
              {[...Array(TOTAL_PAGES)].map((_, index) => (
                <div />
              ))}
            </div>
            <button
              disabled={pageIndex === TOTAL_PAGES - 1}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              {'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
