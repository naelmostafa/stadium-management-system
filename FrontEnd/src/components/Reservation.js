function Reservation(props) {
  <div className="reservation-card">
    <h1>{props.id}</h1>
    <p>{props.customer_id}</p>
    <p>{props.date}</p>
    <p>{props.start_time}</p>
    <p>{props.end_time}</p>
    <p>{props.stadium_id}</p>
    <p>{props.deposit}</p>
    <p>{props.total_price}</p>
    <p>{props.payment_method}</p>
  </div>;
}

export default Reservation;
