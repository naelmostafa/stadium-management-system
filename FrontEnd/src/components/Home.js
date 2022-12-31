import React from "react";
import { Navbar } from "./navbar.component";
import { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/Home.module.css";
import GetStadiums from "./GetStadiums";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Home() {
  // get current date in yyyy-mm-dd format as a string
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate()+1);
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1);
  let day = currentDate.getDate();
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
  let hoursEnd = hours + 1;
  // add 0 to minutes if it is less than 10
  if(minutes < 10) {
    minutes = "0" + minutes;
  }
  if(hours < 10) {
    hours = "0" + hours;
  }
  
  if(hoursEnd < 10) {
    hoursEnd = "0" + hoursEnd;
  }
  const startTime = hours + ":" + minutes;
  const endTime = hoursEnd  + ":" + minutes;
  
  const location  = useLocation();
  const navigate = useNavigate();
  const [stadiums, setStadiums] = useState([]);
  const [reservationDate, setReservationDate] = useState(date);
  const [reservationStartTime, setReservationStartTime] = useState(startTime);
  const [reservationEndTime, setReservationEndTime] = useState(endTime);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const customer = location?.state?.customer ?? null;



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
      console.log('submit')
      setReservationDate(e.target.formDate.value);
      setReservationStartTime(e.target.formStartTime.value);
      setReservationEndTime(e.target.formEndTime.value);
    };


  return (
    <>
      {/* <NavBar /> */}
      <Navbar
                    props={{
                        title: "Stadium Rent",
                        links: [
                            {
                                text: "Home",
                                url: "/",
                            },
                
                            {
                                text: customer==null?"Login":"Hello "+customer.name,
                                url: customer==null?"/login":"/",
                            },
                          
                        ],
                    }}
                />
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
        Search
      </Button>
      </Form>

      <br />
      <GetStadiums reservation_date={reservationDate} start_time={reservationStartTime} end_time={reservationEndTime} stadiums={stadiums} customer_id={customer?.id} />
      



     
    </>
  );




}




export default Home;