type StartPageProps = Readonly<{
  year: number;
}>;

export function StartPage({ year }: StartPageProps) {
  return (
    <div>
      <div>{'Welcome to YNAB Wrapped!'}</div>
      <div>{`Let's take a look back at your YNAB journey in ${year}`}</div>
    </div>
  );
}
