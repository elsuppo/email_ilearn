import { useState } from 'react';
import { Helmet } from "react-helmet";

import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';

const MessagesPage = ({ username, socket, messages }) => {
  const [valueMsg, setValueMsg] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');

  const sendMessage = async () => {
    const message = {
      sender: username,
      recipient,
      subject,
      message: valueMsg,
      date: new Date(),
      id: Date.now(),
      event: 'message'
    }
    await socket.current.send(JSON.stringify(message));
    setRecipient('');
    setSubject('');
    setValueMsg('');
  }

  return (
    <>
      <Helmet>
        <title>Send message</title>
      </Helmet>
      <div className="d-flex justify-content-center">
        <SendMessage
          valueMsg={valueMsg}
          setValueMsg={setValueMsg}
          sendMessage={sendMessage}
          recipient={recipient}
          setRecipient={setRecipient}
          subject={subject}
          setSubject={setSubject}
        />
        <Messages
          messages={messages}
          username={username}
        />
      </div>
    </>

  )
}

export default MessagesPage;
