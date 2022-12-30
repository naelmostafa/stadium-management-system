import React from "react";
import  NavBar  from "./Navbar";
import Search from "./Search";
import { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/Home.module.css";

function Home() {
  // get current date in yyyy-mm-dd format as a string
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1);
  let day = currentDate.getDate() + 1;
  // add 0 to month and day if it is less than 10
  if(month < 10) {
    month = "0" + month;
  }

  if(day < 10) {
    day = "0" + day;
  }

  const date = year + "-" + month + "-" + day;
  // get current time in hh:mm format as a string
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  // add 0 to minutes if it is less than 10
  if(minutes < 10) {
    minutes = "0" + minutes;
  }
  if(hours < 10) {
    hours = "0" + hours;
  }
  const startTime = hours + ":" + minutes;
  const endTime = hours + 1 + ":" + minutes;

  const [stadiums, setStadiums] = useState([]);
  const [reservationDate, setReservationDate] = useState(date);
  const [reservationStartTime, setReservationStartTime] = useState(startTime);
  const [reservationEndTime, setReservationEndTime] = useState(endTime);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  const handleFormChange = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "formDate":
        setReservationDate(e.target.value);
        break;
      case "formStartTime":
        setReservationStartTime(e.target.value);
        break;
      case "formEndTime":
        setReservationEndTime(e.target.value);
        break;
    }
  };
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const apiUrl = "http://localhost:3030/api/v1/stadium/available-stadiums?reservation_date=" + reservationDate + "&start_time=" + reservationStartTime + "&end_time=" + reservationEndTime;
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((response) => response.json()).then((data) => {
      setStadiums(data);
      // console.log(data);
    }
    ).catch((error) => {
      setIsError(true);
      setErrorMessage(error.message);
    });
    };


  return (
    <>
      <NavBar />
      {isError && <p style={styles.error}>{errorMessage}</p>}
      <Form className={styles.form} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formDate" >
          <Form.Label className={styles.label}>Reservation Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date"
            value={reservationDate}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formStartTime">
          <Form.Label className={styles.label}>Start Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter start time"
            value={reservationStartTime}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEndTime">
          <Form.Label className={styles.label}>End Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter end time"
            value={reservationEndTime}
            onChange={handleFormChange}
            required
          />
        </Form.Group>
     <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      


     
    </>
  );




}




export default Home;