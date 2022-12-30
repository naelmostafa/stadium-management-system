import { useEffect, useState } from "react";
import axios from "axios";

function GetStadiums() {
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
      "http://localhost:3030/api/v1/stadium/available-stadiums?reservation_date=2023-01-01&start_time=18:00&end_time=20:00"
    );
    setState(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    fetchStadiums();
  }, []);

  return (
    <div>
      {state.map((item) => {
        return (
          <>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.size}</div>
            <div>{item.cost_per_hour}</div>
            <br></br>
          </>
        );
      })}
    </div>
  );
}
export default GetStadiums;
