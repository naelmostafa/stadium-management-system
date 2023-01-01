import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "./navbar.component";
import { Button, Container, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const navLinks = {
        title: "Admin Login",
        links: [
            {
                text: "Login",
                url: "/admin-login",
            },
            {
                text: "Register",
                url: "/admin-register",
            },
        ],
    }

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handle = async (admin) => {
        
        axios.post("http://localhost:3030/api/v1/admin/login", admin)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if(res.status ===200){
                    navigate('/admin');
                }
                else{
                    setError(res.data['message']);
                }
                resetForm();
            }
            )
            .catch((err) => {
                console.log(err);
                setError(err.response?.data['message']??'Login Failed');
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const admin = {
            email,
            password,
        };
        handle(admin);
        console.log(admin);
    };

    return (
        <>
            <Navbar props={navLinks} />
            <Container className="mb-3">

                <Form className="admin--form" onSubmit={handleSubmit}>
                    {error && <p className="text-danger">{error}</p>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                </Form>
            </Container>

        </>
    )

}