import { InputHTMLAttributes } from 'react';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  onChange: (value: string) => void;
};

function Input({ id, label, onChange, ...props }: InputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input onChange={handleChange} {...props} />
    </div>
  );
}

export default Input;
