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
import { Page } from './Page';
import { AccountsPage } from './Accounts/AccountsPage';

export function BudgetWrapped() {
  useSetAccessToken();
  useFetchYNABData();

  const isAuthenticated = useIsAuthenticated();
  const fetchingYNABData = useFetchingYNABData();

  const totalPages = 10;

  const { pageIndex, scrollProgress, handleScroll, onSpecificPageSelection } =
    useHandleScroll(totalPages);

  const classes = classNames(
    styles['budget-wrapped'],
    `page${pageIndex}`,
    'bg-normal',
    'text-normal'
  );

  return (
    <div className={classes} onWheel={handleScroll}>
      {!isAuthenticated && (
        <Page id={'login'}>
          <button onClick={handleLogin}>{'Login'}</button>
        </Page>
      )}
      {isAuthenticated && fetchingYNABData && (
        <Page id="loading-screen">
          <div>{'Loading...'}</div>
        </Page>
      )}
      {isAuthenticated && !fetchingYNABData && (
        <>
          <BudgetWrappedPageNavigator
            pageIndex={pageIndex}
            totalPages={totalPages}
            onPageSelection={onSpecificPageSelection}
            classes={styles['page-navigator']}
          />
          {pageIndex === 0 && (
            <StartPage
              id={`page${pageIndex}`}
              scrollProgress={scrollProgress}
            />
          )}
          {pageIndex === 1 && (
            <NetChanges
              id={`page${pageIndex}`}
              scrollProgress={scrollProgress}
            />
          )}
          {pageIndex === 2 && (
            <AccountsPage
              id={`page${pageIndex}`}
            />
          )}
          {pageIndex > 2 && (
            <Page id={`page${pageIndex}`}>
              <div>{`page ${pageIndex}`}</div>
            </Page>
          )}
        </>
      )}
    </div>
  );
}
