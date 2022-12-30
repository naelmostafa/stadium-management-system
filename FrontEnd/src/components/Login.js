import React, { useState } from "react";
import  styles  from "../styles/Login.module.css";

const Login = () => {
  const [popupStyle, showPopup] = useState(styles.hide);

  const popup = () => {
    showPopup(styles.login_popup);
    setTimeout(() => showPopup(styles.hide), 2000);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      popup();
    }
  };

  return (
    <div className={styles.page}>
    <div className={styles.cover}>
      <h1>Customer</h1>
      <h3>Login</h3>
      <input type="text" placeholder="Username" />
      <input
        type="password"
        placeholder="Password"
        onKeyDown={handleKeypress}
      />

      <div className={styles.login_btn} onClick={popup}>
        Login
      </div>

      <div className={popupStyle}>
        <h3>Login Failed</h3>
        <p>Username or password incorrect</p>
      </div>
    </div>
    </div>
  );
};

export default Login;
