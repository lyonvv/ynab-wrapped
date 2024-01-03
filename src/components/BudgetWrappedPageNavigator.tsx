import styles from './BudgetWrappedPageNavigator.module.scss';

type BudgetWrappedPageNavigatorProps = Readonly<{
  pageIndex: number;
  totalPages: number;
  setPageIndex: (pageIndex: number) => void;
}>;

export const BudgetWrappedPageNavigator = ({
  pageIndex,
  setPageIndex,
  totalPages,
}: BudgetWrappedPageNavigatorProps) => {
  return (
    <div className={styles['page-navigator']}>
      <button
        disabled={pageIndex === 0}
        onClick={() => setPageIndex(pageIndex - 1)}
      >
        {'Previous'}
      </button>
      <div className={styles['indicator-dots']}>
        {[...Array(totalPages)].map((_, index) => (
          <div
            className={`${styles['indicator-dot']} ${
              index === pageIndex ? styles['is-selected'] : ''
            }`}
          />
        ))}
      </div>
      <button
        disabled={pageIndex === totalPages - 1}
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        {'Next'}
      </button>
    </div>
  );
};
