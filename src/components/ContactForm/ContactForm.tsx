import React, { useState } from 'react';
import { ContactFormData } from '../../types';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

// Classificação automática da mensagem
const classifyMessage = (text: string): string => {
  const lower = text.toLowerCase();

  if (lower.includes('amo') || lower.includes('gostei') || lower.includes('parabéns') || lower.includes('muito bom'))
    return 'elogio';

  if (lower.includes('ruim') || lower.includes('péssimo') || lower.includes('critico') || lower.includes('não gostei'))
    return 'crítica';

  if (lower.includes('como') || lower.includes('quando') || lower.includes('onde') || lower.endsWith('?'))
    return 'dúvida';

  if (lower.includes('erro') || lower.includes('bug') || lower.includes('problema') || lower.includes('travando'))
    return 'problema técnico';

  return 'outro';
};

// Salvar no LocalStorage
const saveToLocalStorage = (data: any) => {
  const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  const updated = [...existing, data];
  localStorage.setItem('contactMessages', JSON.stringify(updated));
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const category = classifyMessage(formData.message);

      const fullData = {
        ...formData,
        category,
        timestamp: new Date().toISOString()
      };

      saveToLocalStorage(fullData);

      onSubmit(fullData);

      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (!value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} é obrigatório`
      }));
    }
  };

  return (
    <>
      <h2 className={styles.formTitle}>Envie sua Mensagem</h2>
      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>Mensagem</label>
          <textarea
            id="message"
            name="message"
            className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
            placeholder="Digite sua mensagem aqui..."
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
        </div>
        
        <button type="submit" className={styles.submitBtn}>
          Enviar Mensagem
        </button>
      </form>
    </>
  );
};

export default ContactForm;
