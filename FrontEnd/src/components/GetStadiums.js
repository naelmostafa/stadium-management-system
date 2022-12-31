import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/GetStadium.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

function GetStadiums(props) {
  console.log('GetStadiums');
  console.log(props.reservation_date);
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  //   const fetchData = async () => {
  //     await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       method: "GET",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setState(data));
  //   };

  const fetchStadiums = async () => {
    const res = await axios.get(
      "http://localhost:3030/api/v1/stadium/available-stadiums?reservation_date="+props.reservation_date+"&start_time="+props.start_time+"&end_time="+props.end_time
    );
    setState(res.data.data);
    console.log(res.data.data);
  };
  const onReserveBtnClicked = async (stadium) => {
    // if customer is not logged in, redirect to login page
    if(!props.customer_id) {
      navigate("/login");
    }
    // get duration of reservation
    const durationHour = (parseInt(props.end_time.substring(0,2)) - parseInt(props.start_time.substring(0,2))); 
    const durationMinute = (parseInt(props.end_time.substring(3,5)) - parseInt(props.start_time.substring(3,5)));
    const duration = durationHour + durationMinute/60;
    console.log(duration);

     axios.post(
      "http://localhost:3030/api/v1/reservation/add",
      {
        "customer_id": props.customer_id,
        "date": props.reservation_date,
        "start_time" : props.start_time,
        "end_time": props.end_time,
        "stadium_id" : stadium.id,
        "deposit" : stadium.cost_per_hour/4,
        "total_price":stadium.cost_per_hour * duration,
        "payment_method":"cash"
    }
    ).then((response) => {
      console.log(response);
      // show alert
      alert("Reservation added successfully");
      // refresh page
      window.location.reload();
    }, (error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchStadiums();
  }, []);

  return (
    <>
    <ul className={styles.ul}>
      {state.map((item) => {
        return (
          <div key={item.id} className="row">
          <Card style={{ width: '18rem' , margin: "4ch" }}>
          {item.photo ? <Card.Img variant="top" src={item.photo+":image/jpeg;base64"} /> : null}
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text style={{color : "black"}}>
            {item.description}
            </Card.Text>
            <Card.Text style={{color : "black"}}>
            Size : {item.size}x{item.size}
            </Card.Text>
            <Card.Text style={{color : "black"}}>
              Location : {item.location}
            </Card.Text>
            <Card.Text >
            Cost : {item.cost_per_hour}
            </Card.Text>
            <Card.Text >
            Deposit to be paid : {item.cost_per_hour/4}
            </Card.Text>

        
            <Button variant="primary" onClick={()=>onReserveBtnClicked(item )}>Reserve now</Button>
          </Card.Body>
        </Card>
        </div>
        );
      })}
    </ul>
    
    </>
  );
}
export default GetStadiums;
