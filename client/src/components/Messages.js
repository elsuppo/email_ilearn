import MessageItem from './MessageItem';

const Messages = ({ messages, username }) => {

  const messagesRows = messages.map(message => {
    return (
      <MessageItem
        key={message._id}
        {...message}
        username={username}
      />
    )
  })

  return (
    <div className="p-4 d-flex flex-column w-75">
      <p className="h4 text-center mb-4">Incoming messages</p>
      <div className="container">
        <div className="row border rounded text-center fw-bolder">
          <div className="col">From</div>
          <div className="col">Subject</div>
          <div className="col">Date</div>
        </div>
        {messagesRows}
      </div>
    </div>
  )
}

export default Messages;