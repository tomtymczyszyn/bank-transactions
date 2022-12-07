import { InputHTMLAttributes } from 'react';
// eslint-disable-next-line import/named
import { useField, FieldHookConfig } from 'formik';
import classnames from 'classnames';
import styles from './Input.module.css';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  FieldHookConfig<string> & {
    label?: string;
  };

export function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props);

  const isError = !!(meta.touched && meta.error);

  return (
    <div className={classnames(styles.inputContainer, isError && styles.inputContainerError)}>
      {label && (
        <label className={styles.label} htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={classnames(styles.input, isError && styles.inputError)}
        id={props.id}
        type={props.type || 'text'}
        {...field}
      />
      {isError ? <div className={styles.inputErrorLabel}>{meta.error}</div> : null}
    </div>
  );
}
