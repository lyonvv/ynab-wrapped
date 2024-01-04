import { useSelectedYear } from '../state/appState';
import { Page } from './Page';

type StartPageProps = Readonly<{
  id: string;
  pageSectionIndex: number;
}>;

export function StartPage({ id, pageSectionIndex }: StartPageProps) {
  const year = useSelectedYear();

  return (
    <Page id={id}>
      <div>{'Welcome to YNAB Wrapped!'}</div>
      <div>{`Let's take a look back at your YNAB journey in ${year}`}</div>
      <div>{'Scroll down to get started'}</div>
      <div>{`Page section index: ${pageSectionIndex}`}</div>
    </Page>
  );
}
