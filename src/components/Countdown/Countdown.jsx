import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Countdown.css';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="bottom-timer"
    >
      <span className="timer-label">ДО ПРАЗДНИКА ОСТАЛОСЬ:</span>
      <div className="timer-values">
        <div className="t-unit">{timeLeft.days}<span>дн</span></div>
        <div className="t-unit">{timeLeft.hours}<span>ч</span></div>
        <div className="t-unit">{timeLeft.minutes}<span>мин</span></div>
        <div className="t-unit">{timeLeft.seconds}<span>сек</span></div>
      </div>
    </motion.div>
  );
};

export default Countdown;