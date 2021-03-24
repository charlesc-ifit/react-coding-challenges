import React, { useContext, useState } from 'react';
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
  
  const [messages, setMessages] = useState([initialBottyMessage]);
  const [userMessage, onChangeMessage] = useState('');
  const sendMessage = () => console.log(`message sent!!`);
  
  // TODO user send msg ('messages__message--me', 'messages__message--last')
  // TODO botty typing
  // TODO user receive msg 
  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messages.map((msg, idx) => (
          <div className={`messages__message${(idx + 1) === messages.length ? ' messages__message--last' : ''}`}>
            {msg}
          </div>
        ))}
      </div>
      <Footer message={userMessage} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
