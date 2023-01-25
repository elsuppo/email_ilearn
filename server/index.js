require('dotenv').config();
const ws = require('ws');
const mongoose = require('mongoose');

const MessageModel = require('./MessageModel');

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connection successfull'))
  .catch(e => console.log(e))

const wss = new ws.Server({
  port: PORT,
}, () => console.log(`Server started on PORT ${PORT}`))


wss.on('connection', function connection(ws) {
  ws.on('message', async function (message) {
    message = JSON.parse(message)[0];
    switch (message.event) {
      case 'connection':
        getAllMessages(message.username)
        console.log(message);
        break;
      case 'message':
        const { sender, recipient, subject, messageDB, dateReg, event } = message;
        await MessageModel.create({ sender, recipient, subject, messageDB, dateReg, event });
        broadcastMessage(recipient);
        break;
    }
  })
})

async function broadcastMessage(username) {
  try {
    const lastMessage = await MessageModel.find({ recipient: username }).sort({ _id: -1 }).limit(1);
    wss.clients.forEach(client => {
      client.send(JSON.stringify(lastMessage));
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllMessages(username) {
  try {
    const allMessages = await MessageModel.find({ recipient: username }).sort({ _id: -1 });
    wss.clients.forEach(client => {
      client.send(JSON.stringify(allMessages));
    })
  } catch (error) {
    console.log(error.message);
  }
}
