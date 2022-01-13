import React, { useState } from "react";
import styles from "../../styles/resetPass.module.css";
const IP = "http://localhost:5000";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${IP}/api/account/users/reset-password/${email}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data.error) {
          setMsg(data.error);
        } else {
          setMsg([data.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.forgetPasswordContainer}>
      <form className={styles.forgetPasswordForm} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="email">
            Enter your email for recieving mail to reset password
          </label>
          <span>
            {msg.map((data, idx) => (
              <p key={idx}>{data}</p>
            ))}
          </span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setMsg([""]);
              setEmail(e.currentTarget.value);
            }}
          />
        </div>
        <div className={styles.formField + " " + styles.btn + " bg_gradient"}>
          <input type="submit" name="submit" value="Send email" />
        </div>
      </form>
    </div>
  );
}
