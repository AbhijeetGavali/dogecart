import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../redux/action/authActions";
import styles from "../../styles/login.module.css";

export default function Login() {
  const IP = "https://dogcart.herokuapp.com/api/account/users";

  const dispatch = useDispatch();
  const login = useSelector((state) => {
    return state.user.user.login;
  });

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState([""]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${IP}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())

      .then((json) => {
        if (!!json.authtoken) {
          dispatch(userLogin(json));
          router.push({
            pathname: "/user/dashboard",
          });
        } else {
          setMsg(json.error);
        }
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <span className={styles.loginHeading}>Sign in to your account</span>
        {login && (
          <p>
            you are already logged in go back to{" "}
            <Link href="/user/dashboard">dashboard</Link> ?
          </p>
        )}
        {msg.map((data, idx) => (
          <p key={idx}>{data}</p>
        ))}
        <form onSubmit={handleLogin}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <div className={styles.resetPass}>
              <Link href="/user/reset-password">Forgot your password?</Link>
            </div>
          </div>
          <div className={styles.field}>
            <input type="submit" name="submit" value="Continue" />
          </div>
          <div className={styles.resetPass}>
            new user <Link href="/user/create-new"> create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
