import useAuthen from "../hooks/useAuthen";

export default function UserInfo({ username }) {
  const { user } = useAuthen();
  if (!user) {
    return null;
  }
  return (
    <div>Hello {user.username}</div>
  )
}