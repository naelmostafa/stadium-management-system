import React from "react";

export const Navbar = ({ props }) => {
    // check if empty props are passed set default values
    if (!props.title) {
        props.title = "Default Title"
    }
    if (!props.links) {
        props.links = [
            {
                text: "Default Link",
                url: "#"
            }
        ]
    }

    return (
        <>
            <nav>
                <h2>
                    {props.title}
                </h2>
                <ul className="nav--ul">
                    {props.links.map((link, index) => {
                        return (
                            <li key={index}>
                                <a href={link.url}>{link.text}</a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>

    )

}


