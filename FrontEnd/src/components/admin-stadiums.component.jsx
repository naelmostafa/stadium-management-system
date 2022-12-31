import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";



/* 
    "data": [
        {
            "id": 1,
            "name": "stadium 1",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        },
        {
            "id": 2,
            "name": "stadium 2",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        }

*/

export const AdminViewStadiums = () => {


    const [stadiums, setStadiums] = useState([
        {
            "id": 1,
            "name": "stadium 1",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        },
        {
            "id": 2,
            "name": "stadium 2",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        }
    ]);

    const getStadiums = () => {

        axios.get("http://localhost:3000/api/v1/stadiums")
            .then(res => {
                setStadiums(res.data);
            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        getStadiums();
    }, []);

    const deleteStadium = (id) => {
        axios.delete(`http://localhost:3000/stadiums/${id}`)
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
                        {stadiums.map((stadium) => (
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