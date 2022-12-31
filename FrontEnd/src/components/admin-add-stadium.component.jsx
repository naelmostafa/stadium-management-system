import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../styles/Home.module.css";


export const AdminAddStadium = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState(0);
    const [location, setLocation] = useState("");
    const [cost_per_hour, setCost_per_hour] = useState(0);
    const [stadium_number, setStadium_number] = useState(0);
    const [status, setStatus] = useState("");


    // reset the form
    const resetForm = () => {
        setName("");
        setDescription("");
        setSize(0);
        setLocation("");
        setCost_per_hour(0);
        setStadium_number(0);
        setStatus("");
    };


    const handle = async (stadium) => {
        // add api url here
        axios.post("http://localhost:3030/api/v1/stadium/add", stadium)
            .then((res) => {
                console.log(res);
                resetForm();
            }
            )
            .catch((err) => console.log(err));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const stadium = {
            name,
            description,
            size,
            location,
            cost_per_hour,
            stadium_number,
            status,
        };
        handle(stadium);
        console.log(stadium);
    };


    return (
        <>
            <Form className={styles.form} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label className={styles.label}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label className={styles.label}>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicSize">
                    <Form.Label className={styles.label}>Size</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicLocation">
                    <Form.Label className={styles.label}>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCost_per_hour">
                    <Form.Label className={styles.label}>Cost per hour</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter cost per hour"
                        value={cost_per_hour}
                        onChange={(e) => setCost_per_hour(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicStadium_number">
                    <Form.Label className={styles.label}>Stadium number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter stadium number"
                        value={stadium_number}
                        onChange={(e) => setStadium_number(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicStatus">
                    <Form.Label className={styles.label}>Status</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </Form.Group>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </Form>
        </>

    );
};
