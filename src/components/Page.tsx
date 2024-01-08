import { useEffect, useState } from 'react';
import styles from './Page.module.scss';

type PageProps = Readonly<{
  id: string;
  scrollProgress: number;
  children: React.ReactNode;
}>;

export function Page({ id, children, scrollProgress }: PageProps) {
  const progressWidth = `${scrollProgress * 100}%`;
  const [transitionStyle, setTransitionStyle] = useState<string>('none');

  useEffect(() => {
    if (scrollProgress <= 0 || scrollProgress >= 1) {
      setTransitionStyle('none');
    } else {
      setTransitionStyle('width 0.5s ease-out');
    }
  }, [scrollProgress]);

  return (
    <div id={id} className={styles['page']}>
      <div
        className={styles['progress-bar']}
        style={{ width: progressWidth, transition: transitionStyle }}
      ></div>
      <div>{'Scroll progress ' + scrollProgress}</div>
      {children}
    </div>
  );
}
