// const express =require('express');
// const cors =require('cors');
// const events = require('events');
const ws = require('ws');

const wss = new ws.Server({
  port: 5000,
}, () => console.log(`Server started on 5000`))

wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;
      case 'connection':
        broadcastMessage(message);
        break;
    }
  })
})

function broadcastMessage(message, id) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
    
  })
}

const message = {
  event: 'message/connection',
  id: 123,
  date: '21.01.2023',
  username: 'Andrew',
  message: 'random message'
}

// const PORT = 5000; 

// const emitter = new events.EventEmitter();

// const app = express();

// app.use(cors());
// app.use(express.json())

// app.get('/connect', (req, res) => {
//   res.writeHead(200, {
//     'Conection': 'keep-alive',
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache'
//   })
//   emitter.on('newMessage', (message) => {
//     res.write(`data: ${JSON.stringify(message)} \n\n`)
//   })
// })

// app.post('/new-messages', (req, res) => {
//   const message = req.body;
//   emitter.emit('newMessage', message);
//   res.status(200);
// })

// app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));