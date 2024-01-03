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
          const isSelected = index === pageIndex;

          const classes = classNames(styles['indicator-dot'], {
            [styles['is-selected']]: isSelected,
            'bg-accent': isSelected,
            'bg-primary': !isSelected,
          });

          return (
            <div
              className={classes}
              onClick={() => onPageSelection(index)}
              key={'page-navigator-' + index}
            />
          );
        })}
      </div>
    </div>
  );
};
