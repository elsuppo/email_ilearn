import { useState, useRef } from 'react';

import Login from './pages/Login';
import Header from './components/Header';
import MessagesPage from './pages/MessagesPage';

const App = () => {
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);

  function connect() {
    socket.current = new WebSocket('wss://email-ilearn-server.onrender.com');

    socket.current.onopen = () => {
      setConnected(true);
      const connect = [{
        event: 'connection',
        username: username ? username : `Guest_${Math.floor(Math.random() * 100000)}`
      }]
      setUsername(connect[0].username);
      socket.current.send(JSON.stringify(connect));
    }

    socket.current.onmessage = async ({ data }) => {
      if (JSON.parse(data)[0]) {
        await JSON.parse(data).map(item => {
          setUsers(prevUsers => !prevUsers.includes(item.recipient) ? [...prevUsers, item.recipient] : [...prevUsers])
        })
        if (JSON.parse(data)[0].event === 'error') {
          setErrors(prev => [...JSON.parse(data), ...prev]);
        } else {
          setMessages(prev => [...JSON.parse(data).filter(message => message.recipient === username), ...prev]);
        }
      }
    }

    socket.current.onclose = () => {
      console.log('socket closed');
      setConnected(false);
      window.location.reload();
    }

    socket.current.onerror = () => {
      console.log('socket closed');
      window.location.reload();
    }
  }

  if (!connected) {
    return <Login
      username={username}
      setUsername={setUsername}
      connect={connect}
    />
  }

  return (
    <div className="container-xl p-4">
      <Header
        username={username}
        setConnected={setConnected}
      />
      <MessagesPage
        username={username}
        messages={messages}
        socket={socket}
        errors={errors}
        setErrors={setErrors}
        users={users}
      />
    </div>
  )
}

export default App;
