import React, { useState, useEffect, useRef } from 'react';
import './ChatIcon.css';

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="chat-icon">
      <div onClick={toggleChat}>
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_qp1q7mct.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{
            width: '130px',
            height: '130px',
            verticalAlign: 'middle',
            marginTop: '-20px',
            marginBottom: '-15px',
            marginLeft: '-2px'
          }}
        ></lottie-player>
        <h3 style={{ display: 'inline', marginLeft: '10px' }}>Chatbot</h3>
      </div>
      {isOpen && (
        <div className="chat-popup" ref={popupRef}>
          <iframe
            src="https://backend-chatbot-rr7y.onrender.com/"
            title="Chatbot"
            width="1050"
            height="700px"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;

