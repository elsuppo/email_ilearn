const SendMessage = ({ valueMsg, setValueMsg, sendMessage, recipient, setRecipient, subject, setSubject }) => {
  return (
    <div className="p-4 d-flex justify-content-center w-25">
      <div>
        <p className="h4 text-center mb-4">Send message</p>
        <div className="form-outline mb-4">
          <label className="form-label">Recipient</label>
          <input
            type="text"
            name="recipient"
            placeholder="to"
            className="form-control"
            autoComplete="on"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            required
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="subject"
            className="form-control"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            placeholder="your message"
            className="form-control"
            value={valueMsg}
            onChange={e => setValueMsg(e.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-primary btn-block mb-4 w-100"
          onClick={sendMessage}>Send message</button>
      </div>
    </div>
  )
}

export default SendMessage;
