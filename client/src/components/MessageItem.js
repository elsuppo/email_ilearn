
const MessageRow = ({ sender, subject, messageDB, date }) => {

  const openMessage = (event) => {
    Array.from(event.target.parentNode.children).filter(child => (child.classList.contains('message')))[0].classList.toggle("d-none");
  }

  return (
    <div className="row border rounded text-center" data-toggle="tooltip" data-placement="top" title="Press to read the message">
      <div
        className="col"
        role="button"
        onClick={openMessage}>{sender}</div>
      <div
        className="col"
        role="button"
        onClick={openMessage}>{subject ? subject : '[no subject]'}</div>
      <div
        className="col"
        role="button"
        onClick={openMessage}>{`${date.slice(0, 10)}, ${date.slice(11, 16)}`}</div>
      <div
        className="message d-none text-start border-top p-4 bg-light">{messageDB ? messageDB : '[message is empty]'}</div>
    </div>
  )
}

export default MessageRow;
