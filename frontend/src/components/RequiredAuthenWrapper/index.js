import {
  useLocation,
  Navigate,
} from "react-router-dom";
import useAuthen from "../../hooks/useAuthen";

export default function RequiredAuthenWrapper({ children }) {
  const auth = useAuthen();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}