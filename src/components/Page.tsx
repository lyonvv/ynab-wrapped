import styles from './Page.module.scss';

type PageProps = Readonly<{
  id: string;
  children: React.ReactNode;
}>;

export function Page({ id, children }: PageProps) {
  return (
    <div id={id} className={styles['page']}>
      {children}
    </div>
  );
}
