import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GUESTS } from '../constants/guests';
import './LoginPage.css'; // Сейчас создадим этот файл

const LoginPage = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const normalizedInput = name.toLowerCase().trim();
    
    // ОБНОВЛЕННАЯ ЛОГИКА ПОИСКА
    const guest = GUESTS.find(g => 
      g.searchName === normalizedInput || 
      (g.aliases && g.aliases.includes(normalizedInput))
    );

    if (guest) {
      localStorage.setItem('guestName', guest.displayName);
      navigate('/invite');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="login-card"
      >
        <h1 className="login-title">Kate's 20th</h1>
        <p className="login-subtitle">Пожалуйста, введите ваше имя, чтобы получить приглашение</p>
        
        <input 
          autoFocus // Курсор сразу будет в поле, когда гость откроет сайт
          type="text" 
          className={`login-input ${error ? 'error' : ''}`}
          placeholder="Your Name"
          value={name}
          onChange={(e) => {
          setName(e.target.value);
          if (error) setError(false); // Сбрасываем ошибку сразу при наборе
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="login-button"
          onClick={handleLogin}
        >
          Get Ticket
        </motion.button>

        {error && <p className="error-text">Sorry, you are not on the guest list :(</p>}
      </motion.div>
    </div>
  );
};

export default LoginPage;