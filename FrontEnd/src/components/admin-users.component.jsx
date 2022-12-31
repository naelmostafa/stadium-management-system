import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

/* 
    "data": {
        "id": 4,
        "name": "omar",
        "email": "test@test.com",
        "phone_number": "01234567",
        "profile_picture": null,
        "balance": 0
    }
*/



export const AdminViewUsers = () => {


    const [users, setUsers] = useState([
        // {
        //     "id": "1",
        //     "name": "test",
        //     "email": "test@gmail.com",
        //     "phone_number": "002215556",
        //     "profile_picture": "test.png",
        //     "balance": "20.0"
        // }
        // ,
        // {
        //     "id": "2",
        //     "name": "test2",
        //     "email": "test2@gmail.com",
        //     "phone_number": "002215556",
        //     "profile_picture": "test2.png",
        //     "balance": "20.0"
        // }
    ]);

    const getUsers = () => {
        axios.get("http://localhost:3030/api/v1/admin/customers")
            .then((response) => {
                setUsers(response.data['data']);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        getUsers();
    }, []);


    return (
        <>
            <Container className="admin--container">
                <h1>Users</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </>
    );
}

