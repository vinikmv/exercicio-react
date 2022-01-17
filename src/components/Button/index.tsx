import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.css';

type ButtonProps = {
  children: string;
 } & ButtonHTMLAttributes<HTMLButtonElement>


const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;