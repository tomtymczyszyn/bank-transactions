import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import styles from './Input.module.css';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props);

  const isError = !!(meta.touched && meta.error);

  return (
    <div className={classnames(styles.inputContainer, isError && styles.inputContainerError)}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input className={classnames(styles.input, isError && styles.inputError)} {...field} {...props} />
      {isError ? <div className={styles.inputErrorLabel}>{meta.error}</div> : null}
    </div>
  );
}
