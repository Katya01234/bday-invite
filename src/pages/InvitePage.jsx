import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GUESTS } from '../constants/guests'; // Твой новый файл с geo
import './InvitePage.css';

const InvitePage = () => {
  const guestName = localStorage.getItem('guestName') || 'Гость';
  const guestData = GUESTS.find(g => g.displayName === guestName);
  
  // Определяем город. Если гостя нет в списке, по умолчанию "Нижний"
  const city = guestData?.geo || "Нижний";

  // Создаем объект с настройками для каждого города
  const cityConfigs = {
    "Нижний": {
      date: '22.04.2026',
      time: '16:00 — Bowling!',
      targetDate: '2026-04-22T16:00:00',
      hint: 'Начинаем встречу в боулинге (Capital Club)',
      locations: [
        { id: 'capital', name: 'Capital Club', address: 'проспект Гагарина, 27', link: 'https://yandex.com/maps/org/capital_club/1037304856' },
        { id: 'herring', name: 'Селедка и кофе', address: 'ул. Рождественская, 19', link: 'https://yandex.com/maps/org/seledka_i_kofe/31961728574' }
      ]
    },
    "Москва": {
      date: '25.04.2026', 
      time: '12:00 — Amusement Park',
      targetDate: '2026-04-25T12:00:00',
      hint: 'Начинаем встречу в парке аттракционов "Сказка"',
      locations: [
        { id: 'park', name: 'Парк Сказка', address: 'Москва, Западный административный округ, район Крылатское', link: 'https://yandex.ru/maps/org/skazka/12547368043?si=bzf6h44x82knjp8nqqbbdd6yf0' },
        { id: 'rest', name: 'Прекрасное и сытное завершение вечера', address: 'Секретно', link: 'https://i.pinimg.com/1200x/b8/c6/ca/b8c6cac56ff70087ea429ad32f72aa65.jpg' }
      ]
    }
  };

  // Выбираем конфиг текущего гостя
  const currentConfig = cityConfigs[city];

  const [activeLoc, setActiveLoc] = useState(null);
  const wishlistLink = "https://t.me/wishlistbestbot?start=2131755328";
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Таймер теперь зависит от targetDate конкретного города
  useEffect(() => {
    const targetDate = new Date(currentConfig.targetDate);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentConfig.targetDate]); // Перезапускаем таймер, если сменился город

  useEffect(() => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ['#E0218A', '#D4AF37', '#FFC0CB'] });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ['#E0218A', '#D4AF37', '#FFC0CB'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="invite-container">
      <motion.div 
        initial={{ y: -1000, rotate: 10, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 35, damping: 12, delay: 0.3 }}
        className="ticket-cinema"
      >
        <div className="ticket-body">
          <div className="ticket-main-info">
            <h2 className="ticket-header">ADMIT ONE  //  ВХОД ПО ПРИГЛАШЕНИЮ</h2>
            <div className="divider"></div>
            
            <h1 className="guest-name">{guestName}</h1>
            
            <p className="event-info">
              You are invited to celebrate Kate's 20th Birthday <br />
              <span className="info-ru">Приглашаем тебя на празднование 20-летия Катюши</span>
            </p>
            
            <div className="details-grid">
              <div className="detail-item">
                <span>DATE / ДАТА</span>
                <strong>{currentConfig.date}</strong>
              </div>
              <div className="detail-item">
                <span>TIME / ВРЕМЯ</span>
                <strong>{currentConfig.time}</strong>
              </div>
              
              <div className="detail-item location-block">
                <span>LOCATION / ЛОКАЦИИ</span>
                <p className="location-hint">{currentConfig.hint}</p>
                
                <div className="loc-icons">
                  {currentConfig.locations.map((loc) => (
                    <div key={loc.id} className="loc-wrapper">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveLoc(activeLoc === loc.id ? null : loc.id)}
                        className={`loc-btn ${activeLoc === loc.id ? 'active' : ''}`}
                      >
                        <span className="pin-icon">📍</span> {loc.name}
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeLoc === loc.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="loc-details"
                          >
                            <p className="loc-addr">{loc.address}</p>
                            <a href={loc.link} target="_blank" rel="noreferrer" className="map-link">
                              Посмотреть на картах →
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-item">
                <span>DRESS CODE</span>
                <strong className="pink-text">Old Money</strong>
              </div>
            </div>
            <div className="wishlist-wrapper">
              <motion.a 
                href={wishlistLink}
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="wishlist-link-btn"
              >
                🎁 WISHLIST / МОЙ ВИШЛИСТ
              </motion.a>
            </div>
          </div>

          <div className="ticket-stub">
            <div className="perforation"></div>
            <div className="barcode-container">
              <div className="barcode">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className={`barcode-line ${i % 5 === 0 ? 'wide' : i % 3 === 0 ? 'medium' : ''}`}></div>
                ))}
              </div>
              <div className="ticket-number">22042026-KATE</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="page-bottom-timer">
        <p className="timer-label">До начала праздника осталось:</p>
        <div className="countdown-container">
          <div className="countdown-item">
            <span className="count-num">{timeLeft.days}</span>
            <span className="count-label">дней</span>
          </div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item">
            <span className="count-num">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="count-label">часов</span>
          </div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item">
            <span className="count-num">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="count-label">мин</span>
          </div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item">
            <span className="count-num">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="count-label">сек</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;