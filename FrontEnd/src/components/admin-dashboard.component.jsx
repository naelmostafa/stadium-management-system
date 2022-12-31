import React from "react"
import { Navbar } from "./navbar.component";


export const AdminDashboard = (props) => {

    const navLinks = {
        title: "Admin Dashboard",
        links: [
            {
                text: "Add Stadium",
                url: "/add-stadium",
            },
            {
                text: "View Stadiums",
                url: "/view-stadiums",
            },
            {
                text: "View Users",
                url: "/view-users",
            },
            {
                text: "View Reservations",
                url: "/view-reservations",
            },
            {
                text: "Logout",
                url: "/logout",
            },
        ],
    }

    // get the selected url from navbar


    return (
        <>
            <Navbar props={navLinks}/>
            {props.body}
        </>
    );
}