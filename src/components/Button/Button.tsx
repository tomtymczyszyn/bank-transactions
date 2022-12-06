import { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactElement | string;
};

function Button({ children, className, ...props }: ButtonProps): ReactElement {
  return (
    <button {...props} className={`${styles.button} ${className || ''}`}>
      {children}
    </button>
  );
}

export default Button;