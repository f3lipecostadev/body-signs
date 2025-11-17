import React, { useEffect, useState } from 'react';
import styles from './AdminMessages.module.css';

interface MessageItem {
  name: string;
  email: string;
  message: string;
  date: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('contactMessages');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  const clearMessages = () => {
    if (window.confirm('Tem certeza que deseja apagar todas as mensagens?')) {
      localStorage.removeItem('contactMessages');
      setMessages([]);
    }
  };

  const deleteMessage = (index: number) => {
    if (window.confirm('Deseja realmente excluir esta mensagem?')) {
      const updatedMessages = messages.filter((_, i) => i !== index);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Painel de Mensagens</h1>
        {messages.length > 0 && (
          <div className={styles.headerInfo}>
            <span className={styles.messageCount}>
              {messages.length} mensagem{messages.length !== 1 ? 's' : ''}
            </span>
            <button className={styles.clearBtn} onClick={clearMessages}>
              🗑️ Apagar Todas
            </button>
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <p className={styles.emptyMessage}>Nenhuma mensagem encontrada</p>
          <p className={styles.emptySubtitle}>
            As mensagens enviadas pelo formulário de contato aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className={styles.messagesGrid}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.messageCard}>
              <div className={styles.messageHeader}>
                <div>
                  <h3 className={styles.senderName}>{msg.name}</h3>
                  <span className={styles.messageDate}>{msg.date}</span>
                </div>
                <button 
                  className={styles.removeBtn}
                  onClick={() => deleteMessage(index)}
                  title="Excluir mensagem"
                >
                  ×
                </button>
              </div>
              
              <div className={styles.messageEmail}>{msg.email}</div>
              
              <div className={styles.messageContent}>
                <p className={styles.messageText}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminMessages;