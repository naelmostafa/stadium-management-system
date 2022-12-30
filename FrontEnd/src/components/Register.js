import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Register.module.css";

const Register = () => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // name is the key and value is the value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleApi = () => {
    console.log("form values: ", formValues);

    axios
      .post("http://localhost:3030/api/v1/customer/register", formValues)
      .then((res) => {
        setIsReady(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Form errors", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form is valid");
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.phone) {
      errors.phone = "Phone is required";
    }
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

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phone}</p>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>

          <button className="fluid ui button blue" onClick={handleApi}>
            Submit
          </button>
        </div>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success">
          <br />
          {isReady ? (
            <h2>Registration successful!</h2>
          ) : (
            <h2>An error occurred while registration. </h2>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Register;
