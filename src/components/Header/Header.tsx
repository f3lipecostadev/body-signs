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
<<<<<<< HEAD
            src="../../../public/images/img-logo.png" 
=======
            src="/images/img-logo.png" 
>>>>>>> 97e39b68aeb83cc01640677f86ee6959c3bb1766
            alt="Logo Body Signs - Mão fazendo sinal em Libras" 
          />
        </Link>
        
        <div className={styles.navCenter}>
          <Link to="/">
            <button className={`${styles.navBtn} ${isActive('/')}`}>
              Home
            </button>
          </Link>
<<<<<<< HEAD
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
          <button className={`${styles.navBtn} ${styles.contactBtn} ${isActive('/contact')}`}>
            Contato 
            <img 
              src="../../../public/images/icon-contact-home.png" 
              alt="Ícone de contato" 
            />
          </button>
        </Link>
=======
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
>>>>>>> 97e39b68aeb83cc01640677f86ee6959c3bb1766
      </nav>
    </header>
  );
};

export default Header;