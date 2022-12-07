import { ReactElement } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactElement | string;
};

export function Container({ children }: ContainerProps): ReactElement {
  return <div className={styles.container}>{children}</div>;
}
