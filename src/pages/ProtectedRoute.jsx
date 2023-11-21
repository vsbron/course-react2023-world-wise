import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";

// Component that redirects user to the homepage if he's not logged in
function ProtectedRoute({ children }) {
  // Getting the isAuthenticated state from Context API
  const { isAuthenticated } = useAuth();

  // Getting the navigate function from useNavigate hook
  const navigate = useNavigate();

  // useEffect hook with the redirect
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // Conditional rendering so the app would not try to load the elements if user's not authenticated
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
