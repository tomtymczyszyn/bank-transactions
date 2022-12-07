import { ButtonHTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './Button.module.css';

export enum VariantOptions {
  Primary = 'primary',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactElement | string;
  variant?: VariantOptions;
};

export function Button({ variant, children, className, ...props }: ButtonProps): ReactElement {
  return (
    <button {...props} className={classnames(styles.button, variant ? styles[variant] : false, className)}>
      {children}
    </button>
  );
}
