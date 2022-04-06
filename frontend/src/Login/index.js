import "./Login.scss";
import useInputChange from "../hooks/useInputChange";
import login from "../api/login";

function Login() {
  const [userName, handleUserNameChange] = useInputChange("");
  const [password, handlePasswordChange] = useInputChange("");

  function handleLoginClick(e) {
    e.preventDefault();
    login({ userName, password });
  }

  return (
    <form className="login">
      <input
        placeholder="Username"
        value={userName}
        onChange={handleUserNameChange}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLoginClick}>Login</button>
    </form>
  )
}

export default Login;