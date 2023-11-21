import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import PageNav from "../components/PageNav";

import { useAuth } from "../context/FakeAuthContext";

import styles from "./Login.module.css";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  // Getting the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Getting the state values from Context API
  const { login, isAuthenticated, error } = useAuth();

  // Form submit handler function
  function handleSubmit(e) {
    // Preventing default behavior
    e.preventDefault();

    // If email and password are filled, go to login function
    login(email, password);
  }

  // Redirect user to main app screen if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      {/* Page navigation component */}
      <PageNav />

      {/* Displays the error messgae if there's any problem with login */}
      {error !== "" && <Message message={error} />}

      {/* Form with email and password fields */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
