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
        const { sender, recipient, subject, messageDB, date, event } = message;
        try {
          await MessageModel.create({ sender, recipient, subject, messageDB, date, event });
          broadcastMessage();
        } catch (error) {
          console.log(error);
          handleErrors(error);
        }
        break;
    }
  })
})

const handleErrors = (error) => {
  let errors = [{ event: 'error', recipient: '' }];
  if (error._message === 'Messages validation failed') {
    errors[0].recipient = 'recipient is required'
    wss.clients.forEach(client => client.send(JSON.stringify(errors)));
  }
}

async function broadcastMessage() {
  try {
    const lastMessage = await MessageModel.find().sort({ _id: -1 }).limit(1);
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
