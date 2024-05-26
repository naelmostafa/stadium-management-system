import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";


export const AdminViewReservations = () => {
    
    const [reservations, setReservations] = useState([]);

    const getReservations = () => {
        axios.get("http://localhost:3030/api/v1/reservation/all")
            .then((response) => {
                setReservations(response.data['data']);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getReservations();
    }, []);

    return (
        <>
            <Container className="admin--container">
                <h1>Reservations</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Stadium ID</th>
                            <th>Deposit</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.customer_id}</td>
                                <td>{reservation.date}</td>
                                <td>{reservation.start_time}</td>
                                <td>{reservation.end_time}</td>
                                <td>{reservation.stadium_id}</td>
                                <td>{reservation.deposit}</td>
                                <td>{reservation.total_price}</td>
                                <td>{reservation.payment_method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </>
    );
}