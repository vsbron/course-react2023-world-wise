import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./User.module.css";

function User() {
  // Getting the state from Context API
  const { logout, user } = useAuth();

  // Getting the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Logout click handler
  function handleClick() {
    // Logging the user out
    logout();

    // Redirecting him to the home page
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
