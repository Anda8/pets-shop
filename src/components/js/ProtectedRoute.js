import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
 // 👇 check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
