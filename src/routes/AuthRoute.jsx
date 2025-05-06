import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

export default function AuthRoute({ children }) {
    return getToken() ? <Navigate to="/dashboard" replace /> : children;
}