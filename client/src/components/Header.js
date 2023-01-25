const Header = ({ username, setConnected }) => {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <p className="h6 m-0 me-3">You entered as <span className="text-success">{username}</span></p>
      <button
        className="btn btn-block btn-primary"
        onClick={() => setConnected(false)}>Log out</button>
    </div>
  )
}

export default Header;
