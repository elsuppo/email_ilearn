import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Stack } from '@mui/material';

import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';

const MessagesPage = ({ username, socket, messages, errors, setErrors, users }) => {
  const [valueMsg, setValueMsg] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    setErrors([]);
  }, [recipient])

  const sendMessage = async () => {
    const message = [{
      sender: username,
      recipient,
      subject,
      messageDB: valueMsg,
      date: new Date(),
      event: 'message'
    }]
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
      <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'start' }}
      justifyContent="center"
    >
        <SendMessage
          valueMsg={valueMsg}
          setValueMsg={setValueMsg}
          sendMessage={sendMessage}
          recipient={recipient}
          setRecipient={setRecipient}
          subject={subject}
          setSubject={setSubject}
          errors={errors} 
          setErrors={setErrors}
          users={users}
          username={username}
        />
        <Messages
          messages={messages}
          username={username}
        />
      </Stack>
    </>

  )
}

export default MessagesPage;
