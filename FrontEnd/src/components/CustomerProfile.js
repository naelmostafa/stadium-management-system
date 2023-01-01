import React, { useState, useEffect } from "react";
import styles from "../styles/customer-profile.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state.customer;
  console.log(customer);

  const routeChange = (e) => {
    let path = "/login";
    if (e.currentTarget.getAttribute("data-value") === "home") {
      path = "/";
    }
    if(path === "/") {
    navigate(path , {state: {customer: customer}});
    }
    else
     navigate(path);
  };

  return (
    <div className={styles.profile}>
      <button
        data-value="home"
        className={styles.et_pb_button}
        onClick={routeChange}
      >
        Home
      </button>
      <button
        data-value="logout"
        className={styles.et_pb_button}
        onClick={routeChange}
      >
        Log out
      </button>
      <h1 className={styles.heading}>Customer Profile</h1>
      <h2 className={styles.greeting}>Welcome, {customer.name}</h2>
      <h3>Here are your account details: </h3>
      {/* <p>{console.log(location.state)}</p> */}
      <div className={styles.customer_details}>
        <form>
          <label>Name</label>
          <input type="text" name="name" value={customer.name} />
          <label>Email</label>
          <input type="email" name="email" value={customer.email} />
          <label>Phone Number</label>
          <input type="text" name="phone" value={customer.phone_number} />

          <label>Balance</label>
          <input type="text" name="balance" value={customer.balance} />
        </form>
      </div>
    </div>
  );
};

export default CustomerProfile;
