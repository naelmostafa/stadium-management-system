import React from "react";
import { Navbar } from "./navbar.component";
import { StadiumForm } from "./stadium-form.component";
import "../styles/stadium-form.css";

export const AddStadium = () => {
    return (
        <>
            <div className="add-stadium">
                <Navbar
                    props={{
                        title: "Stadiums",
                        links: [
                            {
                                text: "Home",
                                url: "/",
                            },
                            {
                                text: "Profile",
                                url: "/profile",
                            },
                            {
                                text: "Stadiums",
                                url: "/stadiums",
                            },
                            {
                                text: "Logout",
                                url: "/logout",
                            },
                        ],
                    }}
                />
                <StadiumForm />
            </div>
        </>

    );
};