import { useFetchingYNABData } from '../state/ynab';
import { useIsAuthenticated } from '../state/auth';
import { StartPage } from './StartPage';
import { NetChanges } from './NetChanges/NetChanges';
import { BudgetWrappedPageNavigator } from './BudgetWrappedPageNavigator';
import { handleLogin } from '../loginHelper';
import { useFetchYNABData } from '../hooks/useFetchYNABData';
import { useHandleScroll } from '../hooks/useHandleScroll';
import { useSetAccessToken } from '../hooks/useSetAccessToken';
import classNames from 'classnames';
import styles from './BudgetWrappedPageNavigator.module.scss';

export function BudgetWrapped() {
  useSetAccessToken();
  useFetchYNABData();

  const isAuthenticated = useIsAuthenticated();
  const fetchingYNABData = useFetchingYNABData();

  const totalPages = 10;
  const scrollPageThreshold = 1000;
  const totalPageSections = 10;

  const {
    pageIndex,
    currentPageSectionIndex,
    handleScroll,
    onSpecificPageSelection,
  } = useHandleScroll(totalPages, scrollPageThreshold, totalPageSections);

  const classes = classNames(
    styles['budget-wrapped'],
    `page${pageIndex}`,
    'bg-normal',
    'text-normal'
  );

  return (
    <div className={classes} onWheel={handleScroll}>
      {!isAuthenticated && <button onClick={handleLogin}>{'Login'}</button>}
      {isAuthenticated && fetchingYNABData && <div>{'Loading...'}</div>}
      {isAuthenticated && !fetchingYNABData && (
        <>
          <BudgetWrappedPageNavigator
            pageIndex={pageIndex}
            totalPages={totalPages}
            onPageSelection={onSpecificPageSelection}
          />
          {pageIndex === 0 && (
            <StartPage
              id={`page${pageIndex}`}
              pageSectionIndex={currentPageSectionIndex}
            />
          )}
          {pageIndex === 1 && (
            <NetChanges
              id={`page${pageIndex}`}
              pageSectionIndex={currentPageSectionIndex}
            />
          )}
        </>
      )}
    </div>
  );
}
