import classNames from 'classnames';
import styles from './BudgetWrappedPageNavigator.module.scss';

type BudgetWrappedPageNavigatorProps = Readonly<{
  pageIndex: number;
  totalPages: number;
  classes: string;
  onPageSelection: (pageIndex: number) => void;
}>;

export const BudgetWrappedPageNavigator = ({
  pageIndex,
  onPageSelection,
  classes,
  totalPages,
}: BudgetWrappedPageNavigatorProps) => {
  const navigatorClasses = classNames(styles['page-navigator'], classes);

  return (
    <div className={navigatorClasses}>
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
