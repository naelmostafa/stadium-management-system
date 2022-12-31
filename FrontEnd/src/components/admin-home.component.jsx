import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

export const AdminHome = () => {
    const [revenue, setRevenue] = useState([]);
    
    const fetchRevenu = () => {
        axios.get("http://localhost:3030/api/v1/admin/revenue")
            .then((response) => {
                setRevenue(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchRevenu();
    }, []);

    return (
        <>
            <Container className="admin--container">
                <h1>Revenue</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenue.map((revenu) => (
                            <tr key={revenu.id}>
                                <td>{revenu.date}</td>
                                <td>{revenu.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </Container>
        </>
    );
}