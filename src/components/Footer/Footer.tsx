import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Instagram">
            <img src="/images/icon-instagram.png" alt="Instagram" />
          </a>
          <a href="#" aria-label="Email">
            <img src="/images/icon-email.png" alt="Email" />
          </a>
          <a href="#" aria-label="WhatsApp">
            <img src="/images/icon-whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
        <p>© 2025 Body Signs. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;