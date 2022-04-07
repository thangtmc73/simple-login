import {
  useNavigate
} from "react-router-dom";
import useAuthen from "../../hooks/useAuthen";
import "./UserStatus.scss";

function UserStatus({ signedIn}) {
  const { user, signOut } = useAuthen();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="component__user-status">
        <span>Sign in <a onClick={() => {
          navigate("/login");
        }}>here</a></span>
      </div>
    );
  }
  const { username } = user;
  return (
    <div className="component__user-status">
      <span>
        {username}
        <a onClick={() => {
          navigate("/user");
        }}>
          User
        </a>
        <a onClick={() => {
          signOut(() => {
            navigate("/");
          })
        }}>Sign out</a>
      </span>
    </div>
  )
}

export default UserStatus;
