import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroImage}>
            <img 
              src="/images/img-hero-body.png" 
              alt="Ilustração do corpo humano com pontos interativos destacando partes como cabeça, tronco e membros" 
            />
          </div>
          <div className={styles.heroText}>
            <h1>DESCUBRA O CORPO EM LIBRAS</h1>
            <div className={styles.textContent}>
              <p>
                Conhecer nosso próprio corpo é o primeiro passo para cuidar da saúde, 
                entender como funcionamos e nos comunicarmos com precisão - especialmente 
                em situações de emergência. Para a comunidade surda, esse conhecimento 
                ganha ainda mais importância: saber os sinais corretos das partes do 
                corpo em Libras pode fazer toda a diferença em consultas médicas, 
                aulas de biologia e no dia a dia.
              </p>
              
              <div className={styles.highlightBox}>
                <p>
                  <strong>Aqui, o aprendizado é para todos!</strong> Você vai explorar 
                  o corpo humano também em <strong>Língua Brasileira de Sinais (Libras)</strong>, 
                  com vídeos autênticos feitos pelos próprios alunos. Educação que inclui, 
                  acolhe e transforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaButtons}>
          <Link to="/videos">
            <button className={`${styles.ctaBtn} ${styles.primary}`}>
              Explorar Libras em Vídeos
            </button>
          </Link>
          <Link to="/games">
            <button className={`${styles.ctaBtn} ${styles.secondary}`}>
              Aprender Jogando
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>👀</div>
            <h3>Assista</h3>
            <p>Vídeos em Libras feitos por alunos</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>🎮</div>
            <h3>Aprenda</h3>
            <p>Jogos interativos para praticar</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>✓</div>
            <h3>Avalie</h3>
            <p>Teste seu conhecimento</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;