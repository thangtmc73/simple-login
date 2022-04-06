import "./Login.scss";
import useInputChange from "../hooks/useInputChange";

function Login() {
  const [userName, handleUserNameChange] = useInputChange("");
  const [password, handlePasswordChange] = useInputChange("");

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
      <button>Login</button>
    </form>
  )
}

export default Login;