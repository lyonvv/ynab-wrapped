import classNames from 'classnames';
import styles from './BudgetWrappedPageNavigator.module.scss';

type BudgetWrappedPageNavigatorProps = Readonly<{
  pageIndex: number;
  totalPages: number;
  onPageSelection: (pageIndex: number) => void;
}>;

export const BudgetWrappedPageNavigator = ({
  pageIndex,
  onPageSelection,
  totalPages,
}: BudgetWrappedPageNavigatorProps) => {
  return (
    <div className={styles['page-navigator']}>
      <div className={styles['indicator-dots']}>
        {[...Array(totalPages)].map((_, index) => {
          const classes = classNames();

          return (
            <div
              className={`${styles['indicator-dot']} ${
                index === pageIndex
                  ? `${styles['is-selected']} bg-accent`
                  : ' bg-primary'
              }`}
              onClick={() => onPageSelection(index)}
              key={'page-navigator-' + index}
            />
          );
        })}
      </div>
    </div>
  );
};
