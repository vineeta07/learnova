import React, { useState } from 'react';
import './ChatIcon.css';

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="chat-icon" onClick={toggleChat}>💬
        <h3>Chat with Assistant here....</h3>
      </div>
      {isOpen && (
        <div className="chat-popup">
          <iframe
            src="http://localhost:5000/"
            title="Chatbot"
            width="1050"
            height="700px"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;

