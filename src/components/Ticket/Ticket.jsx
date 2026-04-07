import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Ticket.css';

const Ticket = ({ guestName }) => {
  const [activeLoc, setActiveLoc] = useState(null);

  const locations = [
    { id: 'capital', name: 'Capital Club', address: 'проспект Гагарина, 27', link: 'https://yandex.com/maps/org/capital_club/1037304856' },
    { id: 'herring', name: 'Селедка и кофе', address: 'ул. Рождественская, 19', link: 'https://yandex.com/maps/org/seledka_i_kofe/31961728574' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="ticket-container"
    >
      <div className="ticket-main-part">
        <div className="gold-inner-border">
          <header className="ticket-top-header">ADMIT ONE // ВХОД ПО ПРИГЛАШЕНИЮ</header>
          <div className="gold-separator"></div>
          
          <h1 className="guest-display-name">{guestName}</h1>
          
          <p className="invite-desc">
            You are invited to celebrate Kate's 20th Birthday <br />
            <span>Приглашаем тебя на празднование 20-летия Катюши</span>
          </p>

          <div className="event-details-row">
            <div className="info-cell">
              <span className="info-label">DATE / ДАТА</span>
              <span className="info-value">22.04.2026</span>
            </div>
            <div className="info-cell">
              <span className="info-label">TIME / ВРЕМЯ</span>
              <span className="info-value">16:00 — Bowling!</span>
            </div>
          </div>

          <div className="loc-section">
            <span className="info-label">LOCATION / ЛОКАЦИИ</span>
            <p className="loc-hint-text">Начинаем встречу в боулинге (Capital Club)</p>
            <div className="loc-pills">
              {locations.map(loc => (
                <button 
                  key={loc.id}
                  className={`loc-pill ${activeLoc === loc.id ? 'active' : ''}`}
                  onClick={() => setActiveLoc(activeLoc === loc.id ? null : loc.id)}
                >
                  📍 {loc.name}
                </button>
              ))}
            </div>
          </div>

          <div className="dc-section">
            <span className="info-label">DRESS CODE</span>
            <span className="info-value pink-accent">Barbie & Old Money</span>
          </div>
        </div>
      </div>

      <div className="ticket-stub-part">
        <div className="stub-divider">
          <div className="punch top"></div>
          <div className="punch bottom"></div>
        </div>
        <div className="barcode-vertical-wrapper">
          <div className="barcode-stripes">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="stripe" style={{ width: i % 4 === 0 ? '3px' : '1px' }}></div>
            ))}
          </div>
          <span className="barcode-label">22042026-KATE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Ticket;