import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <h1> Clínica ACME</h1>

        <div className={styles.link}>
          <Link to="/" aria-label="Clínica ACME - Cadastro">
            Cadastro
          </Link>

          <Link to="/listagem" aria-label="Clínica ACME - Listagem">
            Listagem
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
