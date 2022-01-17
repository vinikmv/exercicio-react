import { InputHTMLAttributes } from 'react';
import styles from './index.module.css';

export type InputProps = {
  label: string;
  error?: string;
  children?: React.ReactNode; 
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ label, children, type, name, value, onChange, error, onBlur }: InputProps) => {

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!!children && children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;