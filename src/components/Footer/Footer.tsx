import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialIcons}>
          <a
            href="https://www.instagram.com/f3lipe_cosst/"
            target="_blank"
            aria-label="Instagram"
            rel="noopener noreferrer"
          >
            <img src="/images/icon-instagram.png" alt="Instagram" />
          </a>

          <a
            href="mailto:felipekaua@acad.ifma.edu.br"
            target="_blank"
            aria-label="Email"
            rel="noopener noreferrer"
          >
            <img src="/images/icon-email.png" alt="Email" />
          </a>

          <a
            href="https://wa.me/5598984075894"
            target="_blank"
            aria-label="WhatsApp"
            rel="noopener noreferrer"
          >
            <img src="/images/icon-whatsapp.png" alt="WhatsApp" />
          </a>
        </div>

        <p>© 2025 Body Signs. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
