import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

export default function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}
