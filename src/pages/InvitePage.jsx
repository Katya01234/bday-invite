import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './InvitePage.css';

const InvitePage = () => {
  const guestName = localStorage.getItem('guestName') || 'Гость';
  const [activeLoc, setActiveLoc] = useState(null);

  useEffect(() => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#E0218A', '#D4AF37', '#FFC0CB']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#E0218A', '#D4AF37', '#FFC0CB']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const locations = [
    {
      id: 'capital',
      name: 'Capital Club',
      address: 'проспект Гагарина, 27',
      link: 'https://yandex.com/maps/org/capital_club/1037304856/?ll=43.980508%2C56.293927&z=14' 
    },
    {
      id: 'herring',
      name: 'Селедка и кофе',
      address: 'ул. Рождественская, 19',
      link: 'https://yandex.com/maps/org/seledka_i_kofe/31961728574/?ll=43.994147%2C56.329832&z=17'
    }
  ];

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
                <strong>22.04.2026</strong>
              </div>
              <div className="detail-item">
                <span>TIME / ВРЕМЯ</span>
                <strong>16:00 — Bowling!</strong>
              </div>
              
              <div className="detail-item location-block">
                <span>LOCATION / ЛОКАЦИИ</span>
                {/* Подсказка о боулинге */}
                <p className="location-hint">Начинаем встречу в боулинге (Capital Club)</p>
                
                <div className="loc-icons">
                  {locations.map((loc) => (
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
                <strong className="pink-text">Barbie & Old Money</strong>
              </div>
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
    </div>
  );
};

export default InvitePage;