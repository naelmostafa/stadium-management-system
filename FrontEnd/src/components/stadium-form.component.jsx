import React, { useState } from "react";
/* 
    "name":"stadium 1",
    "description":"Beautiful stadium",
    "size":5,
    "location":"Smouha,Alexandria",
    "cost_per_hour":200,
    "stadium_number":2,
    "status":"available"


*/

export const StadiumForm = () => {
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
        // make a post request to the server
        // TODO: add api url
        try {
            const response = await fetch("http://localhost:3000/stadiums", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stadium),
            });
            const data = await response.json();
            console.log(data);
            resetForm();
        } catch (error) {
            console.log(error);
        }
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
            <div className="form">
                <h1 className="form--title">Add Stadium</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Size</label>
                        <input
                            type="number"
                            className="form-control"
                            id="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost_per_hour">Cost Per Hour</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cost_per_hour"
                            value={cost_per_hour}
                            onChange={(e) => setCost_per_hour(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stadium_number">Stadium Number</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stadium_number"
                            value={stadium_number}
                            onChange={(e) => setStadium_number(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            className="form-control"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                    <button className="form--button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>

    );
};
