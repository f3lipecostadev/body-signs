import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { RiWhatsappLine } from 'react-icons/ri';
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
            <div className={styles.iconBox}>
              <AiOutlineInstagram className={styles.icon} />
            </div>
          </a>

          <a
            href="mailto:felipekaua@acad.ifma.edu.br"
            target="_blank"
            aria-label="Email"
            rel="noopener noreferrer"
          >
            <div className={`${styles.iconBox} ${styles.emailIcon}`}>
              <HiOutlineMail className={styles.icon} />
            </div>
          </a>

          <a
            href="https://wa.me/5598984075894"
            target="_blank"
            aria-label="WhatsApp"
            rel="noopener noreferrer"
          >
            <div className={styles.iconBox}>
              <RiWhatsappLine className={styles.icon} />
            </div>
          </a>

        </div>

        <p>© 2025 Body Signs. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
