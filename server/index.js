require('dotenv').config();
const ws = require('ws');
const mongoose = require('mongoose');

const MessageModel = require('./MessageModel');
const UserModel = require('./UserModel');

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
    await addNewUser(message.username);
    switch (message.event) {
      case 'connection':
        await getInfo(ws, message.username);
        await broadcastNewConnection(message);
        break;
      case 'message':
        const { sender, recipient, subject, messageDB, date, event } = message;
        try {
          await MessageModel.create({ sender, recipient, subject, messageDB, date, event });
          broadcastLastMessage();
        } catch (error) {
          console.log(error);
          handleErrors(ws, error);
        }
        break;
    }
  })
})

const handleErrors = (ws, error) => {
  let errors = [{ event: 'error', recipient: '' }];
  if (error._message === 'Messages validation failed') {
    errors[0].recipient = 'recipient is required'
    ws.send(JSON.stringify(errors));
  }
}

async function broadcastLastMessage() {
  try {
    const lastMessage = await MessageModel.find().sort({ _id: -1 }).limit(1);
    console.log(lastMessage);
    wss.clients.forEach(client => {
      client.send(JSON.stringify(lastMessage));
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function broadcastNewConnection(message) {
  try {
    console.log(message);
    wss.clients.forEach(client => {
      client.send(JSON.stringify([message]));
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function getInfo(ws, username) {
  try {
    const allUserMessages = await MessageModel.find({ recipient: username }).sort({ _id: -1 });
    const allUsers = await UserModel.find();
    ws.send(JSON.stringify({allUserMessages, allUsers}));
  } catch (error) {
    console.log(error.message);
  }
}

async function addNewUser(username) {
  await UserModel.exists({ user: username }, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      if (!doc) {
        UserModel.create({ user: username }) 
      }
    }
  });
}
