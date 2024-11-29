import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "./PageNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "./Button";

export default function Login() {
  const { isAuthenticated, login } = useAuth();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      console.log(isAuthenticated);
    }
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app");
      console.log(isAuthenticated);
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
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
          <Button type="primary" onClick={() => navigate("/app")}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
