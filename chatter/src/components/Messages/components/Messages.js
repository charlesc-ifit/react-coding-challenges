import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';

import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState([{
    message: initialBottyMessage,
    user: 'bot'
  }]);
  const [userMessage, onChangeMessage] = useState('');

  const sendMessage = () => {
    // playSend(); // TODO enable this after testing
    setMessages([
      ...messages,
      {
        message: userMessage,
        user: 'me'
      }
    ]);
    // onChangeMessage(''); // TODO clear out user input after send
    socket.emit('user-message', userMessage);
  };
  
  // 25 - 75 re-renders when this socket.on is done w/o useCallback
  // (checked with console.log statements)
  // TODO is this something a useCallback can optimize?
  useEffect(() => {
    socket.on('bot-typing', () => {
      setIsBotTyping(true);
      setLatestMessage('bot', 'Typing...');
    });

    socket.on('bot-message', (botMessage) => {
      // playReceive(); // TODO enable this after testing
      setIsBotTyping(false);
      setLatestMessage('bot', botMessage);
      setMessages([
        ...messages,
        {
          message: botMessage,
          user: 'bot'
        }
      ]);
    });
  });


  // Scroll to bottom
  useEffect(() => {
    // TODO UX clean up - scroll to show margin under last message.
    document.querySelector(".messages__message--last").scrollIntoView({ block: 'end' });
  });

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messages.map((message, idx) => (
          <Message
            botTyping={isBotTyping}
            message={{
              ...message,
              id: `${message.user}-${idx}`
            }}
            nextMessage={messages.length >= (idx + 1) ? null : messages[idx + 1]}
          />
        ))}
        {isBotTyping && (
          <TypingMessage />
        )}
      </div>
      <Footer
        message={userMessage}
        sendMessage={sendMessage}
        onChangeMessage={e => onChangeMessage(e.target.value)}
      />
    </div>
  );
}

export default Messages;
