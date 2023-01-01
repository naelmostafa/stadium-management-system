import React, { useEffect, useState } from "react";
import Reservation from "./Reservation";

function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  useEffect(async () => {
    await fetch("http://localhost:3030/api/v1/reservation/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setReservations(data));
  }, []);

  const reservationsData = reservations.map((reservation) => {
    return <Reservation key={reservation.id} reservation={reservation} />;
  });

  return (
    <div className="reservations-list">
      <div className="row">{reservationsData}</div>
    </div>
  );
}

export default ReservationsList;
