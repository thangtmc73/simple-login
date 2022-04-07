import { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import "./Login.scss";
import useInputChange from "../hooks/useInputChange";
import useAuthen from "../hooks/useAuthen";

function Login() {
  const [userName, handleUserNameChange] = useInputChange("");
  const [password, handlePasswordChange] = useInputChange("");
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuthen();
  const navigate = useNavigate();

  function handleLoginClick(e) {
    e.preventDefault();
    signIn({
      userName, password
    }, () => {
      navigate("/", { replace: true });
    }, (error) => {
      setErrorMessage(error);
    });
  }

  return (
    <form className="login">
      {errorMessage && <span className="error">{errorMessage}</span>}
      <input
        placeholder="Username"
        value={userName}
        onChange={(e) => {
          setErrorMessage("");
          handleUserNameChange(e);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setErrorMessage("");
          handlePasswordChange(e);
        }}
      />
      <button onClick={handleLoginClick}>Login</button>
    </form>
  )
}

export default Login;