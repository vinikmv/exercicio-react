import { InputHTMLAttributes } from 'react';
import styles from './index.module.css';

export type InputProps = {
  label?: string;
  error?: string | null;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  children,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  ...props
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {!!label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={props.placeholder}
      />
      {!!children && children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
