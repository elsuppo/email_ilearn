import { Autocomplete, TextField } from '@mui/material';

const SendMessage = ({ valueMsg, setValueMsg, sendMessage, recipient, setRecipient, subject, setSubject, errors, users, username, status, setStatus }) => {

  users = Array.from(new Set(users));

  return (
    <div className="p-4 d-flex justify-content-center w-25">
      <div>
        <p className="h4 text-center mb-4">Send message</p>
        <div className="form-outline mb-4">
          <label className="form-label">Send</label>
          <Autocomplete
            options={users}
            renderInput={(params) => <TextField {...params} label="to" />}
            value={recipient}
            onChange={(event, newRecipient) => {
              setStatus(false);
              setRecipient(newRecipient);
            }}
            freeSolo
            autoSelect={true}
            sx={{width: 250}}
          />
          <span className="text-danger">{errors.length > 0 ? errors[0].recipient : null}</span>
          <span className="text-danger">{!users.includes(recipient) && recipient && recipient !== username ? 'This recipient has not used the app, but will be able to see your message the first time he visits' : null}</span>
          <span className="text-success">{status && errors.length === 0 ? 'message sent successfully' : null}</span>
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
            maxLength="20"
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
            rows="9"
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
