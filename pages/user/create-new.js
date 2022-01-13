// import { Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/userCreateNew.module.css";

export default function CreateNewUser() {
  // define IP of backend to get data
  const IP = "http://localhost:5000";
  const login = useSelector((state) => {
    return state.user.user.login;
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [msg, setMsg] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cPassword && password.length > 8) {
      fetch(`${IP}/api/account/users/`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (res) {
          if (res.status === 200) {
            setMsg(["created Succsesfully"]);
          }
          return res.json();
        })
        .then(function (data) {
          if (!!data.error) {
            setMsg(data.error);
          }
        })
        .catch((e) => console.error(e));
    } else {
      setMsg(["Password should be equal and greater than 8"]);
    }
  };

  return (
    <div className={styles.newUSerFormBoxContainer} id="contact-us">
      <div className={styles.newUserHeader}>
        <h3>New Here ? </h3>
        <p>get started with creating an account</p>
        {login && (
          <p style={{ fontSize: "14px" }}>
            You are loged in already,{" "}
            <Link href="/user/dashboard">
              <a>go to dashboard?</a>
            </Link>
          </p>
        )}
      </div>
      <div className={styles.newUSerFormBox}>
        <form className={styles.newUSerForm} onSubmit={handleSubmit}>
          <span>
            {msg.map((data, idx) => (
              <span key={idx}>{data}</span>
            ))}
            {msg[0] === "created Succsesfully" && (
              <>
                verify your mail address and continue with{" "}
                <Link href="/users/login">Login here</Link>
              </>
            )}
          </span>
          <span>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className={styles.formInput}
                placeholder=" "
                value={firstName}
                required
                onChange={(e) => {
                  setMsg([""]);
                  setFirstName(e.currentTarget.value);
                }}
              />
              <label htmlFor="firstName" className={styles.formLable}>
                First Name *
              </label>
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                className={styles.formInput}
                placeholder=" "
                required
                onChange={(e) => {
                  setMsg([""]);
                  setLastName(e.currentTarget.value);
                }}
              />
              <label htmlFor="lastName" className={styles.formLable}>
                Last Name *
              </label>
            </div>
          </span>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              className={styles.formInput}
              placeholder=" "
              onChange={(e) => {
                setMsg([""]);
                setEmail(e.currentTarget.value);
              }}
            />
            <label htmlFor="email" className={styles.formLable}>
              Email Id *
            </label>
          </div>

          <span>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                className={styles.formInput}
                placeholder=" "
                onChange={(e) => {
                  setMsg([""]);
                  setPassword(e.currentTarget.value);
                }}
              />
              <label htmlFor="password" className={styles.formLable}>
                Password *
              </label>
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                value={cPassword}
                className={styles.formInput}
                placeholder=" "
                onChange={(e) => {
                  setMsg([""]);
                  setCPassword(e.currentTarget.value);
                }}
              />
              <label htmlFor="cpassword" className={styles.formLable}>
                Confirm Password *
              </label>
            </div>
          </span>
          <span>
            {" "}
            <div className={styles.formGroup}>
              <p>
                Already have an account{" "}
                <Link href="/user/login">
                  <a>log in</a>
                </Link>{" "}
                insted?
              </p>
            </div>
            <div className={styles.formGroup}>
              <p>
                forget Password?{" "}
                <Link href="/user/reset-password">
                  <a>get reset link</a>
                </Link>{" "}
              </p>
            </div>
          </span>
          <div className={styles.formGroup}>
            <button
              className={styles.formBtn + " " + styles.btn + " bg_gradient"}
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
