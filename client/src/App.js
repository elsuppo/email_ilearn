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
  const [newUsers, setNewUsers] = useState([]);

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');

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
      try {
        if (JSON.parse(data).length === 1) {
          if (JSON.parse(data)[0].event === 'error') {
            setErrors(prev => [...JSON.parse(data), ...prev]);
          } else if (JSON.parse(data)[0].event === 'connection') {
            setUsers(prev => [...prev, JSON.parse(data)[0].username]);
          } else {
            setMessages(prev => [...JSON.parse(data), ...prev]);
          }
        } else {
          const allUserMessages = JSON.parse(data).allUserMessages;
          const allUsers = JSON.parse(data).allUsers;
          setMessages(prev => [...allUserMessages, ...prev]);
          allUsers.map(user => {
            if (user.user) {
              setUsers(prev => [...prev, user.user]);
            }
          })
        }
      } catch (error) {
        console.log(error);
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
