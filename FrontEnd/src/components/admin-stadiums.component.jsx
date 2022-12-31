import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";


export const AdminViewStadiums = () => {

    const [stadiums, setStadiums] = useState([]);

    const getStadiums = () => {

        axios.get("http://localhost:3030/api/v1/stadium/all")
            .then(res => {
                setStadiums(res.data['data']);
            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        getStadiums();
    }, []);

    const deleteStadium = (id) => {
        axios.delete(`http://localhost:3030/stadium/${id}/delete`)
            .then(res => {
                console.log(res);
                getStadiums();
            })
            .catch(err => console.log(err));
    }


    return (
        <>
            <Container className="admin--container">
                <h1>Stadiums</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Size</th>
                            <th scope="col">Cost Per Hour</th>
                            <th scope="col">Location</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stadiums.map((stadium) => (
                                <tr key={stadium.id}>
                                    <td>{stadium.name}</td>
                                    <td>{stadium.description}</td>
                                    <td>{stadium.size}</td>
                                    <td>{stadium.cost_per_hour}</td>
                                    <td>{stadium.location}</td>
                                    <td>{stadium.photo}</td>
                                    <td>{stadium.status}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => deleteStadium(stadium.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )

                            )}
                    </tbody>
                </table>
            </Container>
        </>


    )

}