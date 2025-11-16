import React, { useState } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import TeamMember from '../../components/TeamMember/TeamMember';
import { TeamMember as TeamMemberType } from '../../types';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const teamMembers: TeamMemberType[] = [
    {
      id: '1',
      name: 'Daiane Algarves',
      role: 'Coordenadora do Projeto',
      email: 'felipe@bodysigns.com.br',
      avatar: 'D'
    },
    {
      id: '2', 
      name: 'Felipe Costa',
      role: 'Desenvolvedor',
      email: 'felipekaua@acad.ifma.edu.br',
      avatar: 'F'
    },
    {
      id: '3',
      name: 'Alexandre Martins Silva',
      role: 'Especialista em Libras',
      email: 'martinsalexandre@acad.ifma.edu.br',
      avatar: 'A'
    },
    {
      id: '4',
      name: 'João Manoel de Sousa Alves',
      role: 'Especialista em Libras',
      email: 'joaomanoel@acad.ifma.edu.br',
      avatar: 'J'
    },
    {
      id: '5',
      name: 'Kaio Javã Alves Conceição',
      role: 'Especialista em Libras',
      email: 'kaiojava@acad.ifma.edu.br',
      avatar: 'K'
    },
    {
      id: '6',
      name: 'Sthefania de Carla Costa Ferreira',
      role: 'Especialista em Libras',
      email: 'sthefaniaferreira@acad.ifma.edu.br',
      avatar: 'S'
    }
  ];

  const handleFormSubmit = (formData: { name: string; email: string; message: string }) => {
    console.log('Formulário enviado:', formData);
    setShowSuccess(true);
    
    setTimeout(() => {
      const successElement = document.getElementById('successMessage');
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.contactHero}>
        <h1>Fale Conosco!</h1>
        <p>Desafie-se e aprenda Libras com diversão! Entre em contato com nossa equipe.</p>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          {/* Formulário de Contato */}
          <div className={styles.contactFormContainer}>
            <ContactForm onSubmit={handleFormSubmit} />
            
            {showSuccess && (
              <div className={styles.successMessage} id="successMessage">
                <h3>✅ Mensagem Enviada com Sucesso!</h3>
                <p>Obrigado pelo seu contato. Retornaremos em breve!</p>
              </div>
            )}
          </div>

          {/* Informações de Contato */}
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <span>📧</span> Informações de Contato
              </h3>
              <p><strong>Email:</strong> felipekaua@acad.ifma.edu.br</p>
              <p><strong>Telefone:</strong> (98) 98407-5894</p>
              <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h</p>
              
              <div className={styles.socialLinks}>
                <a href="https://www.instagram.com/f3lipe_cosst/" target="_blank" className={styles.socialLink} aria-label="Instagram">
                  <img src="/images/icon-instagram.png" alt="Instagram" />
                </a>
                <a href="mailto:felipekaua@acad.ifma.edu.br" target="_blank" className={styles.socialLink} aria-label="Email">
                  <img src="/images/icon-email.png" alt="Email" />
                </a>
                <a href="https://wa.me/5598984075894" target="_blank" className={styles.socialLink} aria-label="WhatsApp">
                  <img src="/images/icon-whatsapp.png" alt="WhatsApp" />
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <span>📍</span> Onde Estamos
              </h3>
              <p><strong>Instituição:</strong> IFMA Campus Timon</p>
              <p><strong>Curso:</strong> Sistemas para Internet</p>
              <p><strong>Localização:</strong> Timon, MA</p>
              <p><strong>Projeto:</strong> PIBIT/PIBIC - Body Signs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da Equipe - Nova estrutura inspirada na imagem */}
      <section className={styles.teamSection}>
        <div className={styles.teamContainer}>
          <div className={styles.teamHeader}>
            <h2 className={styles.teamTitle}>Conheça Nossa Equipe</h2>
            <p className={styles.teamSubtitle}>
              As mentes e corações por trás de cada detalhe do Body Signs.
            </p>
          </div>
          
          <div className={styles.teamGrid}>
            {teamMembers.map(member => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;