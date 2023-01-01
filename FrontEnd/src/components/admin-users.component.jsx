import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";


export const AdminViewUsers = () => {

    const [users, setUsers] = useState([]);

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

