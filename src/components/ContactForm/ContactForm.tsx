import React, { useState } from 'react';
import { ContactFormData } from '../../types';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

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

    // Limpar erro do campo quando usuário começar a digitar
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
      onSubmit(formData);
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
          <label htmlFor="name" className={styles.formLabel}>
            Nome Completo
          </label>
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
          <label htmlFor="email" className={styles.formLabel}>
            E-mail
          </label>
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
          <label htmlFor="message" className={styles.formLabel}>
            Mensagem
          </label>
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