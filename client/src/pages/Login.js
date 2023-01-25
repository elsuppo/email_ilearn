import { Helmet } from "react-helmet";

const Login = ({ username, setUsername, connect }) => {

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-100 p-4 d-flex justify-content-center">
        <div>
          <p className="h4 text-center mb-4">Login</p>
          <div className="form-outline mb-4">
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary btn-block mb-4 w-100"
            onClick={connect}>Login</button>
        </div>
      </div>
    </>
  )
}

export default Login;
