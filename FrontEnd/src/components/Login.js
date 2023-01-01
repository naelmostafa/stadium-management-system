import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [popupStyle, showPopup] = useState("hide");
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // name is the key and value is the value
    console.log(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email address format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  useEffect(() => {
    console.log("Form errors", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form is valid");
    }
  }, [formErrors]);

  // const popup = () => {
  //   showPopup("login-popup");
  //   setTimeout(() => showPopup("hide"), 2000);
  // };

  // const handleKeypress = (e) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     handleSubmit();
  //   }
  // };

  const handleApi = () => {
    console.log("form values: ", formValues);

    axios
      .post("http://localhost:3030/api/v1/customer/login", formValues)
      .then((res) => {
        if (res.status === 200) {
          setMsg("You logged in successfully!");
          navigate("/customer-profile", { state: { customer: res.data["data"] } });
          console.log(res);
          return res.data;
        }
      })
      .catch((err) => {
        setMsg("Error logging in!");
        console.log("Error!", err);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.cover}>
        <form onSubmit={handleSubmit}>
          <h1>Customer Login</h1>
          <div className="field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              // onKeyDown={handleKeypress}
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={styles.login_btn} onClick={handleApi}>
            Login
          </div>
        </form>
        <br />
        <br />
        {msg}
      </div>
    </div>
  );
};

export default Login;
