import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? styles.active : '';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav className={styles.navContainer}>

        {/* Hamburger - mobile */}
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src="/images/img-logo.png" alt="Logo Body Signs" />
        </Link>

        {/* Menu desktop */}
        <div className={styles.navCenter}>
          <Link to="/"><button className={`${styles.navBtn} ${isActive('/')}`}>Home</button></Link>
          <Link to="/videos"><button className={`${styles.navBtn} ${isActive('/videos')}`}>Corpo em Libras</button></Link>
          <Link to="/games"><button className={`${styles.navBtn} ${isActive('/games')}`}>Jogos</button></Link>
        </div>

        {/* Botão Contato com ícone */}
        <Link to="/contact" className={styles.desktopContactBtn}>
          <button className={`${styles.navBtn} ${styles.contactBtn} ${isActive('/contact')}`}>
            Contato
            <FiPhone className={styles.contactIcon} />
          </button>
        </Link>

        {/* Menu mobile */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Link to="/" className={styles.mobileLink} onClick={closeMenu}>
            <span className={`${styles.mobileText} ${isActive('/')}`}>Home</span>
          </Link>

          <Link to="/videos" className={styles.mobileLink} onClick={closeMenu}>
            <span className={`${styles.mobileText} ${isActive('/videos')}`}>Corpo em Libras</span>
          </Link>

          <Link to="/games" className={styles.mobileLink} onClick={closeMenu}>
            <span className={`${styles.mobileText} ${isActive('/games')}`}>Jogos</span>
          </Link>

          <Link to="/contact" className={styles.mobileLink} onClick={closeMenu}>
            <span className={`${styles.mobileText} ${isActive('/contact')}`}>Contato</span>
          </Link>
        </div>

        {/* Overlay */}
        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
      </nav>
    </header>
  );
};

export default Header;
