import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/GetStadium.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function GetStadiums(props) {
  console.log('GetStadiums');
  console.log(props.reservation_date);
  const [state, setState] = useState([]);

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
            
            <Button variant="primary">Reserve now</Button>
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
