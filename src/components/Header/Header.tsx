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
          <button className={styles.navBtn}>
            Corpo em Libras
          </button>
          <button className={styles.navBtn}>
            Jogos
          </button>
        </div>
        
        <button className={`${styles.navBtn} ${styles.contactBtn}`}>
          Contato 
          <img 
            src="/images/icon-contact-home.png" 
            alt="Ícone de contato" 
          />
        </button>
      </nav>
    </header>
  );
};

export default Header;