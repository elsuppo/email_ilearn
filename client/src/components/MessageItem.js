
const MessageRow = ({ sender, subject, messageDB, date }) => {

  const openMessage = (event) => {
    Array.from(event.target.parentNode.children).filter(child => (child.classList.contains('message')))[0].classList.toggle("d-none");
  }

  return (
    <div className="row border rounded text-center">
      <div
        className="col"
        role="button"
        onClick={openMessage}>{sender}</div>
      <div
        className="col"
        role="button"
        onClick={openMessage}>{subject}</div>
      <div
        className="col"
        role="button"
        onClick={openMessage}>{date}</div>
      <div
        className="message d-none text-start border-top p-4">{messageDB}</div>
    </div>
  )
}
// 

export default MessageRow;

          // {/* {message.recipient === username ?
          //   <>
          //     <div onClick={event => Array.from(event.target.children)[0].classList.toggle("invisible")}>
          //       {message.date} from {message.sender} {message.subject}
          //       <div className="invisible">{message.message ? message.message : 'message is empty'}</div>
          //     </div>
          //   </>
          //   : null
          // } */}