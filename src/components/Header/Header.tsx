import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <header>
      <nav className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <img
            src="/images/img-logo.png"
            alt="Logo Body Signs - Mão fazendo sinal em Libras"
          />
        </Link>

        <div className={styles.navCenter}>
          <Link to="/">
            <button className={`${styles.navBtn} ${isActive('/')}`}>
              Home
            </button>
          </Link>

          <Link to="/videos">
            <button className={`${styles.navBtn} ${isActive('/videos')}`}>
              Corpo em Libras
            </button>
          </Link>

          <Link to="/games">
            <button className={`${styles.navBtn} ${isActive('/games')}`}>
              Jogos
            </button>
          </Link>
        </div>

        <Link to="/contact">
          <button
            className={`${styles.navBtn} ${styles.contactBtn} ${isActive('/contact')}`}
          >
            Contato
            <img
              src="/images/icon-contact-home.png"
              alt="Ícone de contato"
            />
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
